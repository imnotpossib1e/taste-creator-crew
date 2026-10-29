import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectIsRestaurantLoaded } from '../../redux/store';
import Skeleton from '../../components/Skeleton';
import './homeWeeklyBest.css';

const CATEGORY_IMG = {
  한식: 'korean.svg',
  중식: 'chinese.svg',
  일식: 'japanese.svg',
  양식: 'american.svg',
  카페: 'cafe.svg',
  분식: 'snack.svg',
  default: 'default.svg',
};

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
        <img
          src={`/${CATEGORY_IMG[store.category_group] ?? 'default.svg'}`}
          alt={store.category_group}
          className="homeWeeklyBestThumb"
        />
        <span>{store.name}</span>
        <div>
          <span>{store.category_group}</span>
          <span>저장 {store.bookmark_count}</span>
        </div>
      </Link>
    </li>
  );
}

// 가게 목록을 불러오는 동안 - 카드(정사각형 썸네일 + 이름 + 정보) 모양으로 3장
function WeeklyBestSkeleton() {
  return (
    <ul aria-busy="true" aria-label="많이 저장한 곳 불러오는 중">
      {[1, 2, 3].map(n => (
        <li key={n}>
          <div className="homeWeeklyBestCard">
            <Skeleton height="116px" radius="12px" />
            <Skeleton width="80%" height="15px" />
            <Skeleton width="50%" height="12px" />
          </div>
        </li>
      ))}
    </ul>
  );
}

function HomeWeeklyBest({ restaurants }) {
  const isLoaded = useSelector(selectIsRestaurantLoaded);
  const bookmarkedStores = getMostBookmarked(restaurants);

  return (
    <section className="homeWeeklyBest">
      <div className="homeWeeklyBestHeader">
        <h2>다들 찜할지도</h2>
      </div>

      {!isLoaded && <WeeklyBestSkeleton />}
      {isLoaded && bookmarkedStores.length === 0 && (
        <p className="homeWeeklyBestEmpty">아직 저장된 가게가 없어요.</p>
      )}
      {isLoaded && bookmarkedStores.length > 0 && (
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
