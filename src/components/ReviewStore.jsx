import './reviewStore.css';

// 종류별 아이콘 (public 폴더) - 지도 목록(RestaurantItem, PlaceCard)과 같은 그림을 쓴다
const CATEGORY_IMG = {
  한식: 'korean.svg',
  중식: 'chinese.svg',
  일식: 'japanese.svg',
  양식: 'american.svg',
  카페: 'cafe.svg',
  분식: 'snack.svg',
};

// 리뷰 대상 가게 카드 - redux 가게 데이터라 종류는 category(음식점)가 아니라 category_group(한식 등)
// 목록에 없는 종류(예: 치킨)는 기본 아이콘
function ReviewStore({ restaurant }) {
  return (
    <div className="reviewStore">
      <img
        src={`/${CATEGORY_IMG[restaurant.category_group] ?? 'default.svg'}`}
        alt={restaurant.category_group}
        className="reviewStoreThumb"
      />
      <div className="reviewStoreInfo">
        <strong>{restaurant.name}</strong>
        <span>{restaurant.category_group}</span>
      </div>
    </div>
  );
}

export default ReviewStore;
