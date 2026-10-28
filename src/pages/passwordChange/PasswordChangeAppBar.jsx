import { useNavigate } from 'react-router-dom';
import './passwordChangeAppBar.css';

// 상단 앱바 - 뒤로가기, 제목
function PasswordChangeAppBar() {
  const navigate = useNavigate();
  return (
    <div className="app-bar">
      <button
        type="button"
        className="frame-17"
        aria-label="뒤로가기"
        style={{ border: 0, background: 'transparent', padding: 0, cursor: 'pointer' }}
        onClick={() => navigate(-1)}
      >
        <div className="vector"></div>
      </button>
      <p className="layer-">비밀번호 변경</p>
      <div className="spacer"></div>
    </div>
  );
}
export default PasswordChangeAppBar;
