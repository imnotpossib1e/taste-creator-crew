import { useNavigate } from 'react-router-dom';
import './myPageAppBar.css';

// 상단 앱바 - 뒤로가기, 제목
function MyPageAppBar() {
  const navigate = useNavigate();
  return (
    <div className="app-bar">
      <button
        type="button"
        className="frame-17"
        aria-label="뒤로가기"
        style={{ border: 0, background: 'transparent', padding: 0, cursor: 'pointer' }}
        onClick={() => navigate('/')}
      >
        <div className="vector"></div>
      </button>
      <p className="layer-">마이페이지</p>
      <div className="spacer"></div>
    </div>
  );
}
export default MyPageAppBar;
