import './myPageTabs.css';
import { likedPlaces, bookmarkedPlaces, buttonStyle } from './myPageConstants';

// 탭 - 내 리뷰 / 좋아요 누른 곳 / 북마크
function MyPageTabs({ activeTab, setActiveTab, reviewCount }) {
  const tabStyle = (selected) => ({
    ...buttonStyle,
    color: selected ? '#0f766e' : undefined,
    fontWeight: selected ? 700 : undefined,
  });

  return (
    <div className="tabs" role="tablist" aria-label="마이페이지 목록">
      <div className="frame-8-7">
        <div className="frame-8-8">
          <div className="frame-8-9">
            <button
              type="button"
              className="frame-10"
              role="tab"
              aria-selected={activeTab === 'reviews'}
              style={tabStyle(activeTab === 'reviews')}
              onClick={() => setActiveTab('reviews')}
            >
              <span
                className="layer-3"
                style={{
                  color:
                    activeTab === 'reviews' ? '#0f766e' : '#6b7280',
                  fontWeight: activeTab === 'reviews' ? 700 : 400,
                }}
              >
                내 리뷰 {reviewCount}
              </span>
            </button>
            <button
              type="button"
              className="layer-3-2"
              role="tab"
              aria-selected={activeTab === 'liked'}
              style={tabStyle(activeTab === 'liked')}
              onClick={() => setActiveTab('liked')}
            >
              좋아요 누른 곳 {likedPlaces.length}
            </button>
            <button
              type="button"
              className="layer-5"
              role="tab"
              aria-selected={activeTab === 'bookmarks'}
              style={tabStyle(activeTab === 'bookmarks')}
              onClick={() => setActiveTab('bookmarks')}
            >
              북마크 {bookmarkedPlaces.length}
            </button>
          </div>
        </div>
        <div className="vector-3"></div>
      </div>
    </div>
  );
}
export default MyPageTabs;
