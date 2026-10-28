import { useNavigate } from 'react-router-dom';
import './signupAppBar.css';

// 상단 앱바 - 뒤로가기, 제목
function SignupAppBar() {
  const navigate = useNavigate();
  return (
    <div className="app-bar">
      <button
        type="button"
        className="frame-17"
        aria-label="뒤로가기"
        style={{ border: 0, background: 'transparent', padding: 0, cursor: 'pointer' }}
        onClick={() => navigate('/login')}
      >
        <div className="vector"></div>
      </button>
      <p className="layer-">회원가입</p>
      <div className="spacer"></div>
    </div>
  );
}
export default SignupAppBar;
