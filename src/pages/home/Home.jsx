import HomeHeader from './HomeHeader';
import HomeTab from './HomeTab';
import HomeCategory from './HomeCategory';
import HomeWeatherBanner from './HomeWeatherBanner';
import HomeRanking from './HomeRanking';
import HomeWeeklyBest from './HomeWeeklyBest';
import './home.css';
import { useState } from 'react';
import { tabs, categories } from './homeConstants';

// 홈 페이지 - 섹션 컴포넌트를 순서대로 조립
function Home() {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <div className="home">
      <HomeHeader />

      <main className="homeContent">
        <HomeTab selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <HomeCategory
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <HomeWeatherBanner />
        <HomeRanking
          selectedTab={selectedTab}
          selectedCategory={selectedCategory}
        />
        <HomeWeeklyBest />
      </main>
    </div>
  );
}

export default Home;
