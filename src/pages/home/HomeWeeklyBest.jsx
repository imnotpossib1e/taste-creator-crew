import { Link } from 'react-router-dom';
import './homeWeeklyBest.css';

// 한 번이라도 저장된 가게만 저장 수 많은 순으로 정렬
// sort는 원본 배열을 바꾸는데, filter가 새 배열을 만들어서 redux 원본은 안전하다
function getMostBookmarked(restaurants) {
  return restaurants
    .filter(store => store.bookmark_count > 0)
    .sort((a, b) => b.bookmark_count - a.bookmark_count)
    .slice(0, 5);
}

// 가로 스크롤 카드 하나 - 누르면 상세(/store/:id)로 이동
function WeeklyBestCard({ store }) {
  return (
    <li>
      <Link to={`/store/${store.id}`} className="homeWeeklyBestCard">
        <div className="homeWeeklyBestThumb" />
        <strong>{store.name}</strong>
        <p>
          <span>{store.category_group}</span>
          <span>저장 {store.bookmark_count}</span>
        </p>
      </Link>
    </li>
  );
}

function HomeWeeklyBest({ restaurants }) {
  const bookmarkedStores = getMostBookmarked(restaurants);

  return (
    <section className="homeWeeklyBest">
      <div className="homeWeeklyBestHeader">
        <h2>많이 저장한 곳</h2>
      </div>

      {bookmarkedStores.length === 0 ? (
        <p className="homeWeeklyBestEmpty">아직 저장된 가게가 없어요.</p>
      ) : (
        <ul>
          {bookmarkedStores.map(store => (
            <WeeklyBestCard key={store.id} store={store} />
          ))}
        </ul>
      )}
    </section>
  );
}

export default HomeWeeklyBest;
