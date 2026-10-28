import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { restoreUser } from './redux/authSlice';
import './App.css';
import BottomNav from './components/BottomNav';

function App() {
  const dispatch = useDispatch();

  // 새로고침해도 Supabase 세션이 남아 있으면 로그인 상태 복원
  useEffect(() => {
    dispatch(restoreUser());
  }, [dispatch]);

  return (
    <div className="App">
      <Outlet />
      <BottomNav />
    </div>
  );
}

export default App;
