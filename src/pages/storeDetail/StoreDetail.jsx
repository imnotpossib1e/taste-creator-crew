import StoreDetailHeader from './StoreDetailHeader';
import StoreInfo from './StoreInfo';
import StoreReviews from './StoreReviews';
import StoreBottomBar from './StoreBottomBar';
import './storeDetail.css';
import { useState } from 'react';
import BookmarkSheet from './BookmarkSheet';
import { stores } from '../../data/stores.js';
import { useParams } from 'react-router-dom';

function StoreDetail() {
  const [isBookmarkSheetOpen, setIsBookmarkSheetOpen] = useState(false);
  const { id } = useParams();

  return (
    <div className="storeDetail">
      <StoreDetailHeader />

      <div className="storeDetailContent">
        <StoreInfo placeId={id} />
        <StoreReviews />
      </div>

      <StoreBottomBar onBookmarkClick={() => setIsBookmarkSheetOpen(true)} />
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
