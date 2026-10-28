import { X } from 'lucide-react';
import './passwordChangeCurrent.css';
import { inputStyle } from './passwordChangeConstants';

// 현재 비밀번호 입력
function PasswordChangeCurrent({ currentPassword, setCurrentPassword, showPasswords, wrong }) {
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
          aria-invalid={wrong}
          style={inputStyle}
        />
        {wrong && (
          <X
            size={20}
            strokeWidth={3}
            color="#ef4444"
            aria-label="현재 비밀번호가 올바르지 않습니다"
            style={{ flexShrink: 0 }}
          />
        )}
      </div>
    </div>
  );
}
export default PasswordChangeCurrent;
