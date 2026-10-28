import { CircleUser, House, MapIcon, Shuffle } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectIsLoggedIn } from '../redux/authSlice';
import './bottomNav.css';

const MENUS = [
  { label: '지도', icon: <MapIcon />, to: '/' },
  { label: '홈', icon: <House />, to: '/home' },
  { label: '랜덤', icon: <Shuffle />, to: '/random' },
  { label: '마이페이지', icon: <CircleUser />, to: '/mypage' },
];
export default function BottomNav() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const handleMenu = to => {
    if (!to) return;
    navigate(to === '/' || isLoggedIn ? to : '/login');
  };
  return (
    <nav className="bottom-menu">
      {MENUS.map(({ label, icon, to }) => (
        <button
          key={label}
          type="button"
          className={`bottom-menu-item${to === '/' ? ' active' : ''}`}
          onClick={() => handleMenu(to)}
        >
          {icon}
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}
