import './reviewStore.css';

// 리뷰 대상 가게 카드 - redux 가게 데이터라 종류는 category(음식점)가 아니라 category_group(한식 등)
function ReviewStore({ restaurant }) {
  return (
    <div className="reviewStore">
      <div className="reviewStoreThumb" />
      <div className="reviewStoreInfo">
        <strong>{restaurant.name}</strong>
        <span>{restaurant.category_group}</span>
      </div>
    </div>
  );
}

export default ReviewStore;
