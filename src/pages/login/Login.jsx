import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logIn } from '../../auth';
import LoginTitle from './LoginTitle';
import LoginFields from './LoginFields';
import LoginSocial from './LoginSocial';
import LoginSignupLink from './LoginSignupLink';
import './login.css';

// 로그인 페이지 - 섹션 컴포넌트를 순서대로 조립
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!email.trim() || !password) {
      setFeedback('이메일과 비밀번호를 입력해 주세요.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFeedback('올바른 이메일 주소를 입력해 주세요.');
      return;
    }

    const result = await logIn({ email, password });
    if (!result.ok) {
      setFeedback(result.message);
      return;
    }
    navigate('/mypage');
  };

  const handlePasswordRecovery = () => {
    setFeedback(
      email.trim()
        ? '비밀번호 재설정 서버가 연결되지 않았습니다.'
        : '비밀번호를 재설정하려면 이메일을 먼저 입력해 주세요.',
    );
  };

  return (
    <div className="layer-2 page6">
      <button
        type="button"
        className="login-back"
        aria-label="뒤로가기"
        onClick={() => navigate('/')}
      >
        <span className="login-back-icon"></span>
      </button>
      <div className="frame-10">
        <LoginTitle />
        <form className="frame-10-3" onSubmit={handleLogin}>
          <LoginFields
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
          <button
            className="component-2"
            type="submit"
          >
            <p className="layer--6">로그인</p>
          </button>
          <button
            type="button"
            className="layer--7"
            onClick={handlePasswordRecovery}
          >
            비밀번호를 잊으셨나요?
          </button>
          <LoginSocial setFeedback={setFeedback} />
          <p className="layer--7" role="status" aria-live="polite">
            {feedback}
          </p>
        </form>
      </div>
      <LoginSignupLink />
    </div>
  );
}
export default Login;
