import { supabase } from '../utils/superbase';

// 카카오 가게 id 목록으로 우리 DB의 별점/리뷰 수/북마크 수를 한 번에 조회
// DB에 아직 없는 가게(리뷰·북마크 0개)는 결과에서 빠진다
export async function getRestaurantStats(placeIds) {
  if (placeIds.length === 0) return [];

  const { data, error } = await supabase
    .from('restaurants')
    .select('id, rating_avg, review_count, bookmark_count')
    .in('id', placeIds);

  if (error) throw error;
  return data;
}
