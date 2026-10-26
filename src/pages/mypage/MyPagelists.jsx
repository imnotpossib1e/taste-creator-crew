import { Bookmark, ThumbsUp } from 'lucide-react';
import './myPagelists.css';
import { likedPlaces, bookmarkedPlaces } from './myPageConstants';

// 좋아요 누른 곳 / 북마크 목록
function MyPagelists({ activeTab }) {
  return (
    <ul className="place-list" role="tabpanel">
      {activeTab === 'liked'
        ? likedPlaces.map((place) => (
            <li className="place-item" key={place.id}>
              <span className="place-thumb"></span>
              <div className="place-info">
                <p className="place-name">{place.name}</p>
                <p className="place-meta">
                  <span className="place-category">
                    {place.category}
                  </span>
                  별점 {place.rating} 리뷰 {place.reviewCount}
                </p>
              </div>
              <span className="place-count">
                <ThumbsUp size={14} />
                {place.likes}
              </span>
            </li>
          ))
        : bookmarkedPlaces.map((place) => (
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
