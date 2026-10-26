import { EyeClosed, Eye } from 'lucide-react';
import './loginFields.css';

// 이메일/비밀번호 입력 영역
function LoginFields({ email, setEmail, password, setPassword, showPassword, setShowPassword }) {
  return (
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
            {showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
}
export default LoginFields;
