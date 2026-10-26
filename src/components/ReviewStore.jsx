import './reviewStore.css';

function ReviewStore({ store }) {
  return (
    <div className="reviewStore">
      <div className="reviewStoreThumb" />
      <div className="reviewStoreInfo">
        <strong>{store.name}</strong>
        <span>{store.category}</span>
      </div>
    </div>
  );
}

export default ReviewStore;
