import { useNavigate } from 'react-router-dom';
import './loginSignupLink.css';

// 회원가입 이동 버튼
function LoginSignupLink() {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className="layer--11"
      style={{ border: 0, background: 'transparent', padding: 0, cursor: 'pointer' }}
      onClick={() => navigate('/signup')}
    >
      처음이신가요? 회원가입
    </button>
  );
}
export default LoginSignupLink;
