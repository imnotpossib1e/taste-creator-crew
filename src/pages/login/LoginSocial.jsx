import './loginSocial.css';
import LoginSignupLink from './LoginSignupLink';

// 구분선, 회원가입 링크
function LoginSocial() {
  return (
    <div className="frame-10-7">
      <div className="frame-10-8">
        <div className="vector-3"></div>
        <p className="layer--8">또는</p>
        <div className="vector-4"></div>
      </div>
      <LoginSignupLink />
    </div>
  );
}
export default LoginSocial;
