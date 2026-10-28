import { Bookmark } from 'lucide-react';
import './storeBottomBar.css';

// isSaved: 내가 저장한 가게면 북마크 아이콘을 채운다
function StoreBottomBar({ isSaved, onBookmarkClick, onWriteReview }) {
  return (
    <div className="storeBottomBar">
      <button
        type="button"
        className="storeBottomBarSave"
        aria-label="북마크"
        aria-pressed={isSaved}
        onClick={onBookmarkClick}
      >
        <Bookmark size={22} fill={isSaved ? 'currentColor' : 'none'} />
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
