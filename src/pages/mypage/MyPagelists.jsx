import { Bookmark } from 'lucide-react';
import './myPagelists.css';
import { bookmarkedPlaces } from './myPageConstants';

// 북마크 목록
function MyPagelists() {
  return (
    <ul className="place-list" role="tabpanel">
      {bookmarkedPlaces.map((place) => (
        <li className="place-item" key={place.id}>
          <span className="place-thumb"></span>
          <div className="place-info">
            <p className="place-name">{place.name}</p>
            <p className="place-meta">
              <span className="place-category">
                {place.category}
              </span>
              {place.area}
            </p>
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
