import { useState } from 'react';
import RankingHeader from './RankingHeader';
import RankingFilter from './RankingFilter';
import RankingList from './RankingList';
import { sortOptions } from './rankingConstants';
import './ranking.css';

// 인기 순위 페이지 - 섹션 컴포넌트를 순서대로 조립
function Ranking() {
  const [sortBy, setSortBy] = useState(sortOptions[0].value);

  return (
    <div className="ranking">
      <RankingHeader />

      <main className="rankingContent">
        <RankingFilter sortBy={sortBy} setSortBy={setSortBy} />
        <RankingList sortBy={sortBy} />
      </main>
    </div>
  );
}

export default Ranking;
