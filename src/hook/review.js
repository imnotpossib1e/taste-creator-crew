import { supabase } from '../utils/superbase';
import { ensureRestaurant } from './restaurant';

// 한 가게의 리뷰 목록 - 최신순, 작성자 닉네임 포함
// users(nickname): reviews.user_id → users.id 외래 키로 연결된 닉네임을 같이 가져옴
// (users.email은 조회 권한이 막혀 있어서 요청하면 안 됨)
export async function getStoreReviews(placeId) {
  const { data, error } = await supabase
    .from('reviews')
    .select('id, rating, good_points, content, created_at, users(nickname)')
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
    .select('id, place_id, place_name, rating, good_points, content')
    .eq('id', reviewId)
    .single();

  if (error) throw error;
  return data;
}

// insert
export async function insertMyReview(review) {
  await ensureRestaurant({ placeId: review.storeId });

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
      },
    ])
    .select();

  if (error) throw error;
  return data[0];
}

// update - ReviewForm이 넘겨주는 review 객체 그대로 받는다
export async function updateMyReview(reviewId, review) {
  const { data, error } = await supabase
    .from('reviews')
    .update({
      place_name: review.storeName,
      rating: review.rating,
      good_points: review.tags.join(','),
      content: review.content,
    })
    .eq('id', reviewId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// 내 리뷰 목록 - 최신순, 가게 이름 포함 (reviews.user_id = users.id)
// 가게 이름은 외래 키 조인 대신 restaurants를 따로 조회해서 붙임 (조인 설정이 없어도 동작)
export async function getMyReviews2(userId) {
  const { data: reviews, error } = await supabase
    .from('reviews')
    .select('id, place_id,place_name, rating, content, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;

  const placeIds = [...new Set(reviews.map((review) => review.place_id))];
  const { data: places } = placeIds.length
    ? await supabase.from('restaurants').select('*').in('id', placeIds)
    : { data: [] };
  const names = Object.fromEntries((places ?? []).map((place) => [place.id, place.place_name]));

  return reviews.map((review) => ({ ...review, restaurantName: names[review.place_id] }));
}

export async function updateMyReview(reviewId, content) {
  const { error } = await supabase.from('reviews').update({ content }).eq('id', reviewId);
  if (error) throw error;
}
// delete
export async function deleteMyReview(reviewId) {
  const { error } = await supabase.from('reviews').delete().eq('id', reviewId);

  if (error) throw error;
}
