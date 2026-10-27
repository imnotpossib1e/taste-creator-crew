import { useState } from 'react';
import './random.css';
import RandomHeader from './RandomHeader';
import RandomCategory from './RandomCategory';
import RandomResult from './RandomResult';
import { ALL_CATEGORY, randomCategories } from './randomConstants';
import { shallowEqual, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// 종류가 '전체'면 그대로, 아니면 category_group(카카오 분류 두 번째 칸: 한식/중식 …)이 같은 가게만
function filterByCategory(list, category) {
  if (category === ALL_CATEGORY) {
    return list;
  }
  return list.filter(item => item.category_group === category);
}

//무작위 하나 고르기
function pickRandom(list) {
  const index = Math.floor(Math.random() * list.length);
  return list[index];
}

function Random() {
  const [selectedCategory, setSelectedCategory] = useState(randomCategories[0]);
  const [pickedId, setPickedId] = useState(null);
  //몇번째인지 카운트
  const [count, setCount] = useState(1);

  const navigate = useNavigate();

  const restaurants = useSelector(state => {
    return state.restaurant;
  }, shallowEqual);

  const candidates = filterByCategory(restaurants, selectedCategory);
  //find로 기억한 id의 가게를 찾고, 없으면 첫 번째 후보를 보여준다!!!!!
  const picked = candidates.find(item => item.id === pickedId) ?? candidates[0];

  const handleCategoryChange = category => {
    setSelectedCategory(category);
    const next = pickRandom(filterByCategory(restaurants, category));
    setPickedId(next?.id);
    setCount(1); // 종류가 바뀌면 1번째 추천부터 다시
  };

  // 다른 곳 보기 - 종류는 그대로라 이미 계산된 candidates에서 다시 뽑는다
  const handleRetry = () => {
    const next = pickRandom(candidates);
    setPickedId(next?.id);
    setCount(prev => prev + 1);
  };

  // 가게 보기 - pickedId는 처음에 null이라, 화면에 보이는 가게(picked)의 id로 이동
  const handleView = () => {
    navigate(`/store/${picked.id}`);
  };

  console.log(selectedCategory, picked?.name);
  return (
    <div className="random">
      <main>
        <RandomHeader />
        <RandomCategory
          selectedCategory={selectedCategory}
          setSelectedCategory={handleCategoryChange}
        />
        <RandomResult
          restaurant={picked}
          count={count}
          onRetry={handleRetry}
          onView={handleView}
        />
      </main>
    </div>
  );
}

export default Random;
