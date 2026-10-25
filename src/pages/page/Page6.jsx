import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logIn } from '../../auth';
import './Page6.css';

export function Component2() {
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
    navigate('/page8');
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
      <div className="frame-10">
        <div className="frame-10-2">
          <p className="layer-">로그인</p>
          <div className="frame-8">
            <p className="layer--2">저장한 가게와 내 리뷰를 어느 기기에서든</p>
            <p className="layer--3">볼 수 있어요.</p>
          </div>
        </div>
        <form className="frame-10-3" onSubmit={handleLogin}>
          <div className="frame-10-4">
            <div className="frame-9">
              <label className="layer--4" htmlFor="login-email">
                이메일
              </label>
              <div className="frame-11">
                <input
                  id="login-email"
                  className="name-example-com"
                  type="email"
                  autoComplete="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
            </div>
            <div className="frame-10-5">
              <label className="layer--5" htmlFor="login-password">
                비밀번호
              </label>
              <div className="frame-10-6">
                <input
                  id="login-password"
                  className="layer-8"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="비밀번호 입력"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <button
                  type="button"
                  className="group"
                  aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 표시'}
                  aria-pressed={showPassword}
                  onClick={() => setShowPassword((visible) => !visible)}
                >
                  <div className="vector"></div>
                  <div className="vector-2"></div>
                </button>
              </div>
            </div>
          </div>
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
          <p className="layer--7" role="status" aria-live="polite">
            {feedback}
          </p>
        </form>
      </div>
      <button
        type="button"
        className="layer--11"
        style={{ border: 0, background: 'transparent', padding: 0, cursor: 'pointer' }}
        onClick={() => navigate('/page7')}
      >
        처음이신가요? 회원가입
      </button>
    </div>
  );
}
