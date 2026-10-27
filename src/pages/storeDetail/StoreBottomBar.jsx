import { Bookmark } from 'lucide-react';
import './storeBottomBar.css';

function StoreBottomBar({ onBookmarkClick, onWriteReview }) {
  return (
    <div className="storeBottomBar">
      <button
        type="button"
        className="storeBottomBarSave"
        aria-label="북마크"
        onClick={onBookmarkClick}
      >
        <Bookmark size={22} />
      </button>
      <button
        type="button"
        className="storeBottomBarWrite"
        onClick={onWriteReview}
      >
        리뷰 쓰기
      </button>
    </div>
  );
}

export default StoreBottomBar;
