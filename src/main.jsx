import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './pages/NotFound';
import MainMap from './pages/MainMap.jsx';
import { Provider } from 'react-redux';
import store from './redux/store.js';

// 임시: Page6~10 확인용 라우트 (export 이름이 파일마다 달라서 맞춰준다)
const pageRoutes = [
  { path: 'page6', lazy: () => import('./pages/page/Page6.jsx').then(m => ({ Component: m.Component2 })) },
  { path: 'page7', lazy: () => import('./pages/page/Page7.jsx').then(m => ({ Component: m.Component1 })) },
  { path: 'page8', lazy: () => import('./pages/page/Page8.jsx').then(m => ({ Component: m.Component1 })) },
  { path: 'page9', lazy: () => import('./pages/page/Page9.jsx').then(m => ({ Component: m.Component1 })) },
  { path: 'page10', lazy: () => import('./pages/page/Page10.jsx').then(m => ({ Component: m.Component2 })) },
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
