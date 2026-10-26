import './signupNicknameField.css';
import { inputStyle } from './signupConstants';

// 닉네임 입력 (최대 10자)
function SignupNicknameField({ nickname, setNickname }) {
  return (
    <div className="frame-12-5">
      <div className="frame-10-7">
        <label className="layer--7" htmlFor="signup-nickname">
          닉네임
        </label>
        <p className="layer-4-10">{nickname.length}/10</p>
      </div>
      <div className="frame-12-6">
        <input
          id="signup-nickname"
          className="yeonnam-example-com-4"
          type="text"
          autoComplete="nickname"
          maxLength={10}
          placeholder="닉네임 입력"
          value={nickname}
          onChange={(event) => setNickname(event.target.value)}
          style={inputStyle}
        />
      </div>
    </div>
  );
}
export default SignupNicknameField;
