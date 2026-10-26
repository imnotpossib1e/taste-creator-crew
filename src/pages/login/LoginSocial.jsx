import { useNavigate } from 'react-router-dom';
import './loginSocial.css';

// 구분선, Google 로그인, 로그인 없이 둘러보기
function LoginSocial({ setFeedback }) {
  const navigate = useNavigate();
  return (
    <div className="frame-10-7">
      <div className="frame-10-8">
        <div className="vector-3"></div>
        <p className="layer--8">또는</p>
        <div className="vector-4"></div>
      </div>
      <button
        type="button"
        className="component-2-2"
        onClick={() =>
          setFeedback('Google 로그인 서비스가 연결되지 않았습니다.')
        }
      >
        <p className="layer--9">Google 계정으로 계속하기</p>
      </button>
      <button
        type="button"
        className="layer--10"
        onClick={() => navigate('/')}
      >
        로그인 없이 둘러보기
      </button>
    </div>
  );
}
export default LoginSocial;
