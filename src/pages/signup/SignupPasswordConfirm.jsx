import './signupPasswordConfirm.css';
import { inputStyle } from './signupConstants';

// 비밀번호 확인 입력
function SignupPasswordConfirm({ password, passwordConfirmation, setPasswordConfirmation }) {
  return (
    <div className="frame-11-3">
      <div className="frame-11-4">
        <div className="frame-10-6">
          <label
            className="layer--6"
            htmlFor="signup-password-confirm"
          >
            비밀번호 확인
          </label>
          <div className="group-4">
            <div
              className="vector-5"
              style={{
                borderColor:
                  passwordConfirmation &&
                  passwordConfirmation === password
                    ? '#0f766e'
                    : '#9ca3af',
              }}
            ></div>
          </div>
        </div>
        <div className="frame-12-4">
          <input
            id="signup-password-confirm"
            className="yeonnam-example-com-3"
            type="password"
            autoComplete="new-password"
            placeholder="비밀번호 다시 입력"
            value={passwordConfirmation}
            onChange={(event) =>
              setPasswordConfirmation(event.target.value)
            }
            style={inputStyle}
          />
        </div>
      </div>
    </div>
  );
}
export default SignupPasswordConfirm;
