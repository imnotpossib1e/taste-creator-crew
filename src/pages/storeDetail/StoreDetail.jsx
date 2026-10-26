import StoreDetailHeader from './StoreDetailHeader';
import StoreInfo from './StoreInfo';
import StoreReviews from './StoreReviews';
import StoreBottomBar from './StoreBottomBar';
import './storeDetail.css';
import { useState } from 'react';
import BookmarkSheet from './BookmarkSheet';
import { stores } from '../../data/stores.js';

function StoreDetail() {
  const [isBookmarkSheetOpen, setIsBookmarkSheetOpen] = useState(false);

  return (
    <div className="storeDetail">
      <StoreDetailHeader />

      <main className="storeDetailContent">
        <StoreInfo />
        <StoreReviews />
      </main>

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
