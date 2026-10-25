import { ThumbsUp } from 'lucide-react';
import { stores } from '../../data/stores';
import './rankingList.css';

// 순위 숫자를 진하게 보여줄 상위 등수
const TOP_RANK = 3;
const LIKE_ICON_SIZE = 16;

// 순위 한 줄
function RankingItem({ store, rank }) {
  return (
    <li className="rankingItem">
      <span className={rank <= TOP_RANK ? 'rankingRank top' : 'rankingRank'}>
        {rank}
      </span>

      <div className="rankingInfo">
        <div className="rankingTitle">
          <div className="rankingThumb" />
          <strong>{store.name}</strong>
        </div>
        <p>
          <span>{store.category}</span>
          <span>
            별점 {store.rating} 리뷰 {store.reviews}
          </span>
        </p>
      </div>

      <div className="rankingLikes" aria-label={`좋아요 ${store.likes}`}>
        <ThumbsUp size={LIKE_ICON_SIZE} aria-hidden="true" />
        <span>{store.likes}</span>
      </div>
    </li>
  );
}

function RankingList({ sortBy }) {
  // 공통 데이터 원본이 바뀌지 않도록 복사한 뒤 정렬
  const sortedStores = [...stores].sort((a, b) => b[sortBy] - a[sortBy]);

  return (
    <ol className="rankingList">
      {sortedStores.map((store, index) => (
        <RankingItem key={store.id} store={store} rank={index + 1} />
      ))}
    </ol>
  );
}

export default RankingList;
