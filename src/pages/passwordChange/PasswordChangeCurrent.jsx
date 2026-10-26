import './passwordChangeCurrent.css';
import { inputStyle } from './passwordChangeConstants';

// 현재 비밀번호 입력
function PasswordChangeCurrent({ currentPassword, setCurrentPassword, showPasswords }) {
  return (
    <div className="frame-10-2">
      <label className="layer--3" htmlFor="current-password">
        현재 비밀번호
      </label>
      <div className="frame-12">
        <input
          id="current-password"
          className="yeonnam-example-com"
          type={showPasswords ? 'text' : 'password'}
          autoComplete="current-password"
          placeholder="현재 비밀번호 입력"
          value={currentPassword}
          onChange={(event) =>
            setCurrentPassword(event.target.value)
          }
          style={inputStyle}
        />
      </div>
    </div>
  );
}
export default PasswordChangeCurrent;
