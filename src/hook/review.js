import { supabase } from '../utils/superbase';
import { ensureRestaurant } from './restaurant';

// 리뷰 사진 여러 장을 Storage 버킷(review-image)에 올리고, 볼 수 있는 주소 배열을 반환
// photos에는 새로 고른 File과, 수정할 때 남겨 둔 기존 사진 주소(문자열)가 섞여 있을 수 있다
// 폴더 첫 칸을 auth id로 해야 "내 폴더에만 업로드" 보안 정책을 걸 수 있음 (프로필 이미지와 같은 방식)
// 파일 이름은 리뷰·사진마다 달라야 다른 사진을 덮어쓰지 않아서 시간 + 순서로 만든다
export async function uploadReviewImages(photos) {
  if (photos.length === 0) return [];

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const authId = session?.user?.id;
  if (!authId) throw new Error('로그인이 필요합니다.');

  const uploadOne = async (file, index) => {
    // 이미 올라가 있는 사진(주소)은 그대로 쓴다
    if (typeof file === 'string') return file;

    const ext = file.name.split('.').pop();
    const path = `${authId}/${Date.now()}-${index}.${ext}`;

    const { error } = await supabase.storage
      .from('review-image')
      .upload(path, file, { contentType: file.type });
    if (error) throw error;

    const { data } = supabase.storage.from('review-image').getPublicUrl(path);
    return data.publicUrl;
  };

  // 여러 장을 동시에 올리고, 고른 순서대로 주소 배열을 받는다
  return Promise.all(photos.map(uploadOne));
}

// 한 가게의 리뷰 목록 - 최신순, 작성자 닉네임 포함
// user_id: 로그인한 사용자와 비교해서 내 리뷰에만 수정/삭제 버튼을 보여줄 때 사용
// users(nickname): reviews.user_id → users.id 외래 키로 연결된 닉네임을 같이 가져옴
// (users.email은 조회 권한이 막혀 있어서 요청하면 안 됨)
// image_url: 리뷰 사진 주소들 (JSON 글자)
export async function getStoreReviews(placeId) {
  const { data, error } = await supabase
    .from('reviews')
    .select(
      'id, user_id, rating, good_points, content, created_at, image_url, users(nickname)',
    )
    .eq('place_id', placeId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

// 내가 쓴 리뷰 목록 - 최신순 (마이페이지용)
export async function getMyReviews(userId) {
  const { data, error } = await supabase
    .from('reviews')
    .select(
      'id, place_id, place_name, rating, good_points, content, created_at',
    )
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

// 리뷰 하나 - 수정 페이지에서 기존 내용 채울 때
export async function getReview(reviewId) {
  const { data, error } = await supabase
    .from('reviews')
    .select('id, place_id, place_name, rating, good_points, content, image_url')
    .eq('id', reviewId)
    .single();

  if (error) throw error;
  return data;
}

// insert
export async function insertMyReview(review) {
  await ensureRestaurant({ placeId: review.storeId });
  // 사진을 먼저 버킷에 올리고, 받은 주소 배열을 글자(JSON)로 바꿔 image_url에 저장
  const imageUrls = await uploadReviewImages(review.photos);

  const { data, error } = await supabase
    .from('reviews')
    .insert([
      {
        user_id: review.userId,
        place_name: review.storeName,
        place_id: review.storeId,
        rating: review.rating,
        good_points: review.tags.join(','),
        content: review.content,
        image_url: JSON.stringify(imageUrls),
      },
    ])
    .select();

  if (error) throw error;
  return data[0];
}

// update - ReviewForm이 넘겨주는 review 객체 그대로 받는다
export async function updateMyReview(reviewId, review) {
  // 남겨 둔 기존 사진은 주소 그대로, 새로 고른 사진만 업로드
  const imageUrls = await uploadReviewImages(review.photos);

  const { data, error } = await supabase
    .from('reviews')
    .update({
      place_name: review.storeName,
      rating: review.rating,
      good_points: review.tags.join(','),
      content: review.content,
      image_url: JSON.stringify(imageUrls),
    })
    .eq('id', reviewId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// delete - 가게 상세에서 내 리뷰 삭제
// RLS에 막히면 에러 없이 0건이 지워져서, 지워진 행이 없으면 실패로 본다
export async function deleteMyReview(reviewId) {
  const { data, error } = await supabase
    .from('reviews')
    .delete()
    .eq('id', reviewId)
    .select('id');

  if (error) throw error;
  if (data.length === 0) throw new Error('삭제된 리뷰가 없어요.');
}

// ============

// 내 리뷰 목록 - 최신순, 가게 이름 포함 (reviews.user_id = users.id)
// 가게 이름은 외래 키 조인 대신 restaurants를 따로 조회해서 붙임 (조인 설정이 없어도 동작)
export async function getMyReviews2(userId) {
  const { data: reviews, error } = await supabase
    .from('reviews')
    .select('id, place_id,place_name, rating, content, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;

  const placeIds = [...new Set(reviews.map(review => review.place_id))];
  const { data: places } = placeIds.length
    ? await supabase.from('restaurants').select('*').in('id', placeIds)
    : { data: [] };
  const names = Object.fromEntries(
    (places ?? []).map(place => [place.id, place.place_name]),
  );

  return reviews.map(review => ({
    ...review,
    restaurantName: names[review.place_id],
  }));
}

export async function updateMyReview2(reviewId, content) {
  const { error } = await supabase
    .from('reviews')
    .update({ content })
    .eq('id', reviewId);
  if (error) throw error;
}
// delete
export async function deleteMyReview2(reviewId) {
  const { error } = await supabase.from('reviews').delete().eq('id', reviewId);

  if (error) throw error;
}
