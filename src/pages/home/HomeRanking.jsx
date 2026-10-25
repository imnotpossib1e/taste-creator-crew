import { useState } from 'react';
import { Bookmark } from 'lucide-react';
import { categories } from './homeConstants';
import { stores } from '../../data/stores';
import './homeRanking.css';

// 인기 순위에 보여줄 최대 개수
const RANKING_LIMIT = 3;
const ALL_CATEGORY = categories[0];

// 선택된 탭/카테고리에 맞는 가게를 좋아요 순으로 정렬
function getRankedStores(selectedTab, selectedCategory) {
  return stores
    .filter(store => store.type === selectedTab)
    .filter(
      store =>
        selectedCategory === ALL_CATEGORY ||
        store.category === selectedCategory,
    )
    .sort((a, b) => b.likes - a.likes)
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
          <span>{store.category}</span>
          <span>도보 {store.walkMinutes}분</span>
        </p>
        <p>
          <span>좋아요 {store.likes}</span>
          <span>리뷰 {store.reviews}</span>
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

function HomeRanking({ selectedTab, selectedCategory }) {
  const rankedStores = getRankedStores(selectedTab, selectedCategory);
  // 화면 확인용 저장 상태 - 새로고침하면 초기화됨
  const [savedIds, setSavedIds] = useState([]);

  const handleToggleSave = id => {
    setSavedIds(prev => toggleSavedId(prev, id));
  };

  return (
    <section className="homeRanking">
      <div className="homeRankingHeader">
        <h2>인기 순위</h2>
        <button type="button">지도로 보기</button>
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
