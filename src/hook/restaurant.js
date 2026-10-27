import { supabase } from '../utils/superbase';

// 카카오 가게 목록에 우리 DB의 별점/리뷰 수/북마크 수를 붙여서 반환
// DB에 아직 없는 가게(리뷰·북마크 0개)는 0으로 채운다
export async function getRestaurantStats(places) {
  // 가게가 없으면 요청 보낼 필요 없이 바로 끝
  if (places.length === 0) return places;

  // 카카오 가게 id만 뽑기 - Set으로 중복 id 제거
  const ids = [...new Set(places.map(p => p.id))];

  // id 목록 중 하나인 가게들만 한 번에 조회 (.in = 이 목록 중 하나)
  const { data, error } = await supabase
    .from('restaurants')
    .select('id, rating_avg, review_count, bookmark_count')
    .in('id', ids);

  if (error) throw error;

  // DB 결과로 "id → 행" 사전 만들기 - statMap.get(id)로 바로 꺼낼 수 있다
  // data가 null이면 빈 배열로 대신해서 에러 방지
  const statMap = new Map((data ?? []).map(r => [r.id, r]));

  // 카카오 가게마다 사전에서 숫자를 찾아 붙인다
  return places.map(p => {
    // DB에 없는 가게면 s는 undefined
    const s = statMap.get(p.id);
    return {
      ...p, // 카카오 정보(이름, 카테고리, 거리 등) 그대로 복사
      // s가 없으면(?.) undefined → ?? 0 으로 기본값 0
      review_count: s?.review_count ?? 0,
      bookmark_count: s?.bookmark_count ?? 0,
      // numeric 타입은 '4.6'처럼 문자열로 올 수 있어서 숫자로 변환 (정렬용)
      rating_avg: Number(s?.rating_avg ?? 0),
    };
  });
}

// insert
// reviews/bookmarks의 place_id가 restaurants.id를 참조해서, 저장 전에 가게가 먼저 있어야 한다
// place_name은 not null이라 처음 등록되는 가게는 이름이 꼭 필요 (이미 있으면 아무것도 안 함)
export async function ensureRestaurant({ placeId, placeName }) {
  const { error } = await supabase
    .from('restaurants')
    .upsert(
      { id: placeId, place_name: placeName },
      { onConflict: 'id', ignoreDuplicates: true },
    );

  if (error) throw error;
}

// update / delete는 만들지 않는다
// rating_avg, review_count, bookmark_count는 DB 트리거가 자동으로 계산하고,
// 가게를 지우면 연결된 리뷰/북마크까지 영향을 받기 때문
