import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectRestaurants } from '../../redux/store';
import RankingHeader from './RankingHeader';
import RankingFilter from './RankingFilter';
import RankingList from './RankingList';
import { sortOptions } from './rankingConstants';
import './ranking.css';

// 인기 순위 페이지 - 섹션 컴포넌트를 순서대로 조립
function Ranking() {
  const [sortBy, setSortBy] = useState(sortOptions[0].value);
  // 지도(MainMap)에서 불러온 주변 가게 - 별점/리뷰 수/저장
  const restaurants = useSelector(selectRestaurants);

  return (
    <div className="ranking">
      <RankingHeader />

      <main className="rankingContent">
        <RankingFilter sortBy={sortBy} setSortBy={setSortBy} />
        <RankingList restaurants={restaurants} sortBy={sortBy} />
      </main>
    </div>
  );
}

export default Ranking;
