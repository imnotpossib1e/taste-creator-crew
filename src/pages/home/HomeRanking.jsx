import { Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import { categories } from './homeConstants';
import { WALK_METERS_PER_MINUTE } from '../random/randomConstants';
import BookmarkSheet from '../storeDetail/BookmarkSheet';
import { useBookmark } from '../../hook/useBookmark';
import './homeRanking.css';

// 인기 순위에 보여줄 최대 개수
const RANKING_LIMIT = 3;
const ALL_CATEGORY = categories[0];
// 별점 소수점 자리수 (4.6)
const RATING_DIGITS = 1;

// 거리(m) → 도보 분 (랜덤 페이지와 같은 계산)
function toWalkMinutes(distance) {
  return Math.ceil(Number(distance) / WALK_METERS_PER_MINUTE);
}

// 선택된 탭/카테고리에 맞는 가게를 별점 순으로 정렬 (별점이 같으면 리뷰 많은 순)
// sort는 원본 배열을 바꾸는데, filter가 새 배열을 만들어서 redux 원본은 안전하다
function getRankedStores(restaurants, selectedTab, selectedCategory) {
  return restaurants
    .filter(store => store.category === selectedTab)
    .filter(
      store =>
        selectedCategory === ALL_CATEGORY ||
        store.category_group === selectedCategory,
    )
    .sort(
      (a, b) => b.rating_avg - a.rating_avg || b.review_count - a.review_count,
    )
    .slice(0, RANKING_LIMIT);
}

// 인기 순위 한 줄 - 가게 정보를 누르면 상세(/store/:id)로 이동
// 북마크 버튼은 링크 밖에 둔다 (링크 안에 버튼을 넣으면 북마크를 눌러도 이동해 버림)
function RankingItem({ store, isSaved, onBookmarkClick }) {
  return (
    <li className="homeRankingItem">
      <Link to={`/store/${store.id}`} className="homeRankingInfo">
        <div className="homeRankingTitle">
          <div className="homeRankingThumb" />
          <strong>{store.name}</strong>
        </div>
        <p>
          <span>{store.category_group}</span>
          <span>도보 {toWalkMinutes(store.distance)}분</span>
        </p>
        <p>
          <span>별점 {store.rating_avg.toFixed(RATING_DIGITS)}</span>
          <span>리뷰 {store.review_count}</span>
        </p>
      </Link>
      <button
        type="button"
        aria-label={`${store.name} 저장`}
        aria-pressed={isSaved}
        onClick={() => onBookmarkClick(store)}
      >
        <Bookmark fill={isSaved ? 'currentColor' : 'none'} />
      </button>
    </li>
  );
}

function HomeRanking({ restaurants, selectedTab, selectedCategory }) {
  const rankedStores = getRankedStores(
    restaurants,
    selectedTab,
    selectedCategory,
  );
  const {
    savedIds,
    sheetStore,
    handleBookmarkClick,
    closeSheet,
    saveBookmark,
  } = useBookmark();

  return (
    <section className="homeRanking">
      <div className="homeRankingHeader">
        <h2>인기 순위</h2>
        <Link to="/ranking">전체보기</Link>
      </div>

      {rankedStores.length === 0 ? (
        <p className="homeRankingEmpty">아직 등록된 가게가 없어요.</p>
      ) : (
        <ul>
          {rankedStores.map(store => (
            <RankingItem
              key={store.id}
              store={store}
              isSaved={savedIds.includes(store.id)}
              onBookmarkClick={handleBookmarkClick}
            />
          ))}
        </ul>
      )}

      {sheetStore && (
        <BookmarkSheet
          restaurant={sheetStore}
          onClose={closeSheet}
          onSave={saveBookmark}
        />
      )}
    </section>
  );
}

export default HomeRanking;
