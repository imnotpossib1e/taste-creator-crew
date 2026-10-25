import { stores } from '../../data/stores';
import './reviewStore.css';

function ReviewStore() {
  const store = stores.find(item => item.id === 1);

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
