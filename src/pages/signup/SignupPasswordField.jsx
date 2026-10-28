import './signupPasswordField.css';
import { inputStyle } from './signupConstants';

// 비밀번호 입력 + 규칙 체크리스트(8자 이상, 영문, 숫자)
function SignupPasswordField({ password, setPassword, passwordRules }) {
  return (
    <div className="frame-10-3">
      <div className="frame-11">
        <label className="layer--3" htmlFor="signup-password">
          비밀번호
        </label>
        <div className="frame-12-2">
          <input
            id="signup-password"
            className="yeonnam-example-com-2"
            type="password"
            autoComplete="new-password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            style={inputStyle}
          />
        </div>
      </div>
      <div className="frame-10-4">
        <div className="frame-10-5">
          <div className="group">
            <div
              className="vector-2"
              style={{
                borderColor: passwordRules.longEnough
                  ? '#0f766e'
                  : '#9ca3af',
              }}
            ></div>
          </div>
          <p
            className="layer-8"
            style={{
              color: passwordRules.longEnough
                ? '#0f766e'
                : '#9ca3af',
            }}
          >
            8자 이상
          </p>
        </div>
        <div className="frame-11-2">
          <div className="group-2">
            <div
              className="vector-3"
              style={{
                borderColor: passwordRules.hasLetter
                  ? '#0f766e'
                  : '#9ca3af',
              }}
            ></div>
          </div>
          <p
            className="layer--4"
            style={{
              color: passwordRules.hasLetter
                ? '#0f766e'
                : '#9ca3af',
            }}
          >
            영문 포함
          </p>
        </div>
        <div className="frame-12-3">
          <div className="group-3">
            <div
              className="vector-4"
              style={{
                borderColor: passwordRules.hasNumber
                  ? '#0f766e'
                  : '#9ca3af',
              }}
            ></div>
          </div>
          <p
            className="layer--5"
            style={{
              color: passwordRules.hasNumber
                ? '#0f766e'
                : '#9ca3af',
            }}
          >
            숫자 포함
          </p>
        </div>
      </div>
    </div>
  );
}
export default SignupPasswordField;
