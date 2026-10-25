import StoreDetailHeader from './StoreDetailHeader';
import StoreInfo from './StoreInfo';
import StoreReviews from './StoreReviews';
import StoreBottomBar from './StoreBottomBar';
import './storeDetail.css';

function StoreDetail() {
  return (
    <div className="storeDetail">
      <StoreDetailHeader />

      <main className="storeDetailContent">
        <StoreInfo />
        <StoreReviews />
      </main>

      <StoreBottomBar />
    </div>
  );
}

export default StoreDetail;
