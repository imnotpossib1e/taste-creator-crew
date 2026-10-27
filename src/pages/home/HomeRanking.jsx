import { useState } from 'react';
import { Bookmark } from 'lucide-react';
import { categories } from './homeConstants';
import { WALK_METERS_PER_MINUTE } from '../random/randomConstants';
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

// 저장 목록에 id가 있으면 빼고, 없으면 추가한 새 배열을 반환
function toggleSavedId(savedIds, id) {
  return savedIds.includes(id)
    ? savedIds.filter(savedId => savedId !== id)
    : [...savedIds, id];
}

// 인기 순위 한 줄
function RankingItem({ store, isSaved, onToggleSave }) {
  return (
    <li className="homeRankingItem">
      <div className="homeRankingInfo">
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
      </div>
      <button
        type="button"
        aria-label={`${store.name} 저장`}
        aria-pressed={isSaved}
        onClick={() => onToggleSave(store.id)}
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
  // 화면 확인용 저장 상태 - 새로고침하면 초기화됨
  const [savedIds, setSavedIds] = useState([]);

  const handleToggleSave = id => {
    setSavedIds(prev => toggleSavedId(prev, id));
  };

  return (
    <section className="homeRanking">
      <div className="homeRankingHeader">
        <h2>인기 순위</h2>
        <button type="button">전체보기</button>
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
              onToggleSave={handleToggleSave}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

export default HomeRanking;
