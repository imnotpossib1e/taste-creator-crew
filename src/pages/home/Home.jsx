import HomeHeader from './HomeHeader';
import HomeTab from './HomeTab';
import HomeCategory from './HomeCategory';
import HomeWeatherBanner from './HomeWeatherBanner';
import HomeRanking from './HomeRanking';
import HomeWeeklyBest from './HomeWeeklyBest';
import './home.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { tabs, categories } from './homeConstants';
import { selectRestaurants } from '../../redux/store';

const ALL_CATEGORY = categories[0];
const CAFE_TAB = tabs[1];

// 홈 페이지 - 섹션 컴포넌트를 순서대로 조립
function Home() {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  // 지도(MainMap)에서 불러온 주변 가게 - 별점/리뷰 수/북마크 수
  const restaurants = useSelector(selectRestaurants);

  // 카페에는 한식/중식 같은 분류가 없어서 '전체' 칩만 보여준다
  const visibleCategories =
    selectedTab === CAFE_TAB ? [ALL_CATEGORY] : categories;

  // 탭을 바꾸면 칩도 '전체'로 - 음식점에서 고른 '한식'이 카페 탭에 남아 목록이 비는 것 방지
  const handleTabChange = tab => {
    setSelectedTab(tab);
    setSelectedCategory(ALL_CATEGORY);
  };

  return (
    <div className="home">
      <HomeHeader />

      <main className="homeContent">
        <HomeTab selectedTab={selectedTab} setSelectedTab={handleTabChange} />
        <HomeCategory
          categories={visibleCategories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <HomeWeatherBanner />
        <HomeRanking
          restaurants={restaurants}
          selectedTab={selectedTab}
          selectedCategory={selectedCategory}
        />
        <HomeWeeklyBest restaurants={restaurants} />
      </main>
    </div>
  );
}

export default Home;
