import './passwordChangeConfirm.css';
import { inputStyle } from './passwordChangeConstants';

// 새 비밀번호 확인 입력
function PasswordChangeConfirm({ newPassword, passwordConfirmation, setPasswordConfirmation, showPasswords }) {
  return (
    <div className="frame-11-3">
      <div className="frame-11-4">
        <div className="frame-10-7">
          <label
            className="layer--7"
            htmlFor="confirm-new-password"
          >
            새 비밀번호 확인
          </label>
          <div className="group-5">
            <div
              className="vector-6"
              style={{
                borderColor:
                  passwordConfirmation &&
                  passwordConfirmation === newPassword
                    ? '#0f766e'
                    : '#9ca3af',
              }}
            ></div>
          </div>
        </div>
        <div className="frame-12-4">
          <input
            id="confirm-new-password"
            className="yeonnam-example-com-3"
            type={showPasswords ? 'text' : 'password'}
            autoComplete="new-password"
            placeholder="새 비밀번호 다시 입력"
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
export default PasswordChangeConfirm;
