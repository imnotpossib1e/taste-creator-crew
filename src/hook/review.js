import { supabase } from '../utils/superbase';

async function ensureRestaurant(placeId) {
  const { error } = await supabase
    .from('restaurants')
    .upsert({ id: placeId }, { onConflict: 'id', ignoreDuplicates: true });

  if (error) throw error;
}

export async function insertMyReview(review) {
  await ensureRestaurant(review.storeId);

  const { data, error } = await supabase
    .from('reviews')
    .insert([
      {
        user_id: review.userId,
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
