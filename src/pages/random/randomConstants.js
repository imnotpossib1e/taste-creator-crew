// 종류 칩 '전체' - 이걸 고르면 거르지 않는다
export const ALL_CATEGORY = '전체';

// 랜덤 추천 종류 칩 - 홈과 달리 카페까지 포함
export const randomCategories = [
  ALL_CATEGORY,
  '한식',
  '중식',
  '일식',
  '양식',
  '분식',
  '카페',
];

// 후보가 없을 때 안내 - 해당 종류가 주변에 없거나, 지도를 거치지 않아 redux가 비어 있을 때
export const EMPTY_RESULT_MESSAGE = '주변에 조건에 맞는 가게가 없어요.';

// 도보 속도(분당 미터) - 성인 평균 걸음 약 4km/h 기준
export const WALK_METERS_PER_MINUTE = 67;
