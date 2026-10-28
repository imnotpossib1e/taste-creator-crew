import { Bookmark } from 'lucide-react';
import './myPagelists.css';

// 카테고리 이미지는 RestaurantItem과 같은 매핑
const CATEGORY_IMG = {
  한식: 'korean.svg',
  중식: 'chinese.svg',
  일식: 'japanese.svg',
  양식: 'american.svg',
  카페: 'cafe.svg',
  분식: 'snack.svg',
  default: 'default.svg',
};

// 북마크 목록
function MyPagelists({ bookmarks, onDelete }) {
  return (
    <ul className="place-list" role="tabpanel">
      {bookmarks.length === 0 && <p role="status">북마크한 가게가 없습니다.</p>}
      {bookmarks.map((place) => (
        <li className="place-item" key={place.id}>
          <img
            src={`/${CATEGORY_IMG[place.category] ?? CATEGORY_IMG.default}`}
            alt={place.category ?? ''}
            className="place-thumb"
          />
          <div className="place-info">
            <p className="place-name">{place.name}</p>
            {place.memo && (
              <p className="place-memo">{place.memo}</p>
            )}
          </div>
          <button
            type="button"
            className="place-bookmark"
            aria-label="북마크 삭제"
            onClick={() => onDelete(place)}
          >
            <Bookmark size={16} fill="#111827" />
          </button>
        </li>
      ))}
    </ul>
  );
}
export default MyPagelists;
