import { CircleUser, House, MapIcon, Shuffle } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import './bottomNav.css';

const MENUS = [
  { label: '지도', icon: <MapIcon />, to: '/' },
  { label: '홈', icon: <House />, to: '/home' },
  { label: '랜덤', icon: <Shuffle />, to: '/random' },
  { label: '마이페이지', icon: <CircleUser />, to: '/mypage' },
];
export default function BottomNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  // 로그인 검사는 하지 않고 이동만 - 지도/홈/랜덤은 누구나 볼 수 있고,
  // 마이페이지는 main.jsx의 loader가 Supabase 세션을 확인해서 로그인 화면으로 보낸다
  const handleMenu = to => {
    if (!to) return;
    navigate(to);
  };

  // '/'는 정확히 일치할 때만, 나머지는 하위 경로(/mypage/edit 등)도 포함
  const isActive = to =>
    to === '/' ? pathname === '/' : pathname.startsWith(to);
  return (
    <nav className="bottom-menu">
      {MENUS.map(({ label, icon, to }) => (
        <button
          key={label}
          type="button"
          className={`bottom-menu-item${isActive(to) ? ' active' : ''}`}
          onClick={() => handleMenu(to)}
          aria-current={isActive(to) ? 'page' : undefined}
        >
          {icon}
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}
