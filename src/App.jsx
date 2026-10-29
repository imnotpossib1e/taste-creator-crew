import { useCallback, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { restoreUser } from './redux/authSlice';
import './App.css';
import BottomNav from './components/BottomNav';
import Splash from './components/Splash';
import { useLoadRestaurants } from './hook/useLoadRestaurants';

function App() {
  const dispatch = useDispatch();
  // 앱을 켤 때(새로고침 포함) 한 번만 스플래시 - 페이지 이동으로는 다시 안 뜬다
  const [isSplash, setIsSplash] = useState(true);
  // Splash의 useEffect가 렌더링마다 다시 돌지 않게 같은 함수를 계속 넘긴다
  const handleSplashFinish = useCallback(() => setIsSplash(false), []);

  // 새로고침해도 Supabase 세션이 남아 있으면 로그인 상태 복원
  useEffect(() => {
    dispatch(restoreUser());
  }, [dispatch]);

  // 새로고침해도 주변 가게 목록을 다시 불러와 스토어에 채움
  useLoadRestaurants();

  return (
    <div className="App">
      <Outlet />
      <BottomNav />
      {isSplash && <Splash onFinish={handleSplashFinish} />}
    </div>
  );
}

export default App;
