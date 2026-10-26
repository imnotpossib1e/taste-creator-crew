import { useNavigate } from 'react-router-dom';
import { logOut } from '../../auth';
import './myPageSettings.css';
import { buttonStyle } from './myPageConstants';

// 설정 메뉴 - 알림 토글, 앱 설치, 로그아웃, 안내 메시지
function MyPageSettings({
  notificationsEnabled,
  setNotificationsEnabled,
  setFeedback,
  handleInstall,
  feedback,
}) {
  const navigate = useNavigate();
  return (
    <div className="settings-menu">
      <div className="frame-8-27">
        <div className="frame-8-28">
          <p className="layer--17">새 투표 알림</p>
          <button
            type="button"
            className="frame-20"
            style={{
              ...buttonStyle,
              background: notificationsEnabled ? '#0f766e' : '#9ca3af',
              padding: notificationsEnabled
                ? '3px 3px 3px 21px'
                : '3px 21px 3px 3px',
            }}
            role="switch"
            aria-checked={notificationsEnabled}
            aria-label="새 투표 알림"
            onClick={() => {
              setNotificationsEnabled((enabled) => !enabled);

            }}
          >
            <div className="vector-21"></div>
          </button>
        </div>
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
          onClick={() => {
            logOut();
            navigate('/login');
          }}
        >
          로그아웃
        </button>
        <p role="status" aria-live="polite">
          {feedback}
        </p>
      </div>
    </div>
  );
}
export default MyPageSettings;
