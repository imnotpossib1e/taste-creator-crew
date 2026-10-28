import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom';
import { supabase } from './utils/superbase';
import NotFound from './pages/NotFound';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import MainMap from './pages/map/MainMap';

// 새로 배포되면 옛 화면이 찾던 lazy 페이지 파일이 사라져 NotFound가 뜬다 - 새로고침해서 새 파일을 받는다
window.addEventListener('vite:preloadError', () => window.location.reload());

// 로그인/회원가입/마이페이지/프로필 수정/비밀번호 변경 라우트
// (path는 각 페이지 폴더 이름과 같게 맞춘다)
const pageRoutes = [
  {
    path: 'login',
    lazy: () =>
      import('./pages/login/Login.jsx').then(m => ({ Component: m.default })),
  },
  {
    path: 'signup',
    lazy: () =>
      import('./pages/signup/Signup.jsx').then(m => ({ Component: m.default })),
  },
  {
    path: 'mypage',
    // 비로그인 접근 차단: alert 후 로그인 페이지로 이동
    loader: async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) return null;
      window.alert('로그인 후 사용 가능한 서비스 입니다');
      return redirect('/login');
    },
    lazy: () =>
      import('./pages/mypage/MyPage.jsx').then(m => ({ Component: m.default })),
  },
  {
    path: 'profileEdit',
    lazy: () =>
      import('./pages/profileEdit/ProfileEdit.jsx').then(m => ({
        Component: m.default,
      })),
  },
  {
    path: 'passwordChange',
    lazy: () =>
      import('./pages/passwordChange/PasswordChange.jsx').then(m => ({
        Component: m.default,
      })),
  },
  {
    path: 'home',
    lazy: () =>
      import('./pages/home/Home.jsx').then(m => ({ Component: m.default })),
  },
  {
    path: 'ranking',
    lazy: () =>
      import('./pages/ranking/Ranking.jsx').then(m => ({
        Component: m.default,
      })),
  },
  {
    path: 'random',
    lazy: () =>
      import('./pages/random/Random.jsx').then(m => ({ Component: m.default })),
  },
  {
    path: 'reviewWrite/:id',
    lazy: () =>
      import('./pages/reviewWriter/ReviewWrite.jsx').then(m => ({
        Component: m.default,
      })),
  },
];

// router 설계
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <MainMap />,
      },
      {
        path: 'store/:id',
        lazy: () =>
          import('./pages/storeDetail/StoreDetail.jsx').then(m => ({
            Component: m.default,
          })),
      },
      ...pageRoutes,
      {
        path: '*', // 와일드 카드 - 지정된 경로 외의 모든 경로
        element: <NotFound />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
