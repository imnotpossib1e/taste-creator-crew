import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { supabase } from '../../utils/superbase';
import './myPageSettings.css';
import { buttonStyle } from './myPageConstants';

// 설정 메뉴 - 알림 토글, 앱 설치, 로그아웃, 안내 메시지
function MyPageSettings({
  notificationsEnabled,
  setNotificationsEnabled,
  handleInstall,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="settings-menu">
      <div className="frame-8-27">
        <div className="vector-22"></div>
        <button
          type="button"
          className="frame-8-29"
          style={{
            ...buttonStyle,
            background: 'transparent',
            width: '100%',
          }}
          onClick={handleInstall}
        >
          <span className="layer--18">홈 화면에 앱 추가</span>
          <span className="group">
            <span className="vector-23"></span>
          </span>
        </button>
        <div className="vector-24"></div>
        <button
          type="button"
          className="layer--19"
          style={buttonStyle}
          onClick={async () => {
            await supabase.auth.signOut();
            dispatch(logout());
            navigate('/login');
          }}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}
export default MyPageSettings;
