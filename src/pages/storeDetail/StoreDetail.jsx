import StoreDetailHeader from './StoreDetailHeader';
import StoreInfo from './StoreInfo';
import StoreReviews from './StoreReviews';
import StoreBottomBar from './StoreBottomBar';
import './storeDetail.css';
import { useState } from 'react';
import BookmarkSheet from './BookmarkSheet';
import { stores } from '../../data/stores.js';
import { useNavigate, useParams } from 'react-router-dom';

function StoreDetail() {
  const [isBookmarkSheetOpen, setIsBookmarkSheetOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleWriteReview = () => {
    navigate(`/reviewWrite/${id}`);
  };

  return (
    <div className="storeDetail">
      <StoreDetailHeader />

      <div className="storeDetailContent">
        <StoreInfo placeId={id} />
        <StoreReviews onWriteReview={handleWriteReview} />
      </div>

      <StoreBottomBar
        onBookmarkClick={() => setIsBookmarkSheetOpen(true)}
        onWriteReview={handleWriteReview}
      />
      {isBookmarkSheetOpen && (
        <BookmarkSheet
          store={stores[0]}
          onClose={() => setIsBookmarkSheetOpen(false)}
          onSave={data => console.log('북마크 저장:', data)}
        />
      )}
    </div>
  );
}

export default StoreDetail;
