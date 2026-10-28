import { Bookmark } from 'lucide-react';
import './myPagelists.css';

// 북마크 목록
function MyPagelists({ bookmarks }) {
  return (
    <ul className="place-list" role="tabpanel">
      {bookmarks.length === 0 && <p role="status">북마크한 가게가 없습니다.</p>}
      {bookmarks.map((place) => (
        <li className="place-item" key={place.id}>
          <span className="place-thumb"></span>
          <div className="place-info">
            <p className="place-name">{place.name}</p>
            {place.memo && (
              <p className="place-memo">{place.memo}</p>
            )}
          </div>
          <Bookmark size={16} fill="#111827" />
        </li>
      ))}
    </ul>
  );
}
export default MyPagelists;
