import './profileEditNickname.css';
import { inputStyle } from './profileEditConstants';

// 닉네임 입력 (최대 10자)
function ProfileEditNickname({ nickname, setNickname }) {
  return (
    <div className="frame-8-2">
      <div className="frame-8-3">
        <label className="layer--2" htmlFor="profile-nickname">
          닉네임
        </label>
        <p className="layer-4-10">{nickname.length}/10</p>
      </div>
      <div className="frame-12">
        <input
          id="profile-nickname"
          className="yeonnam-example-com"
          type="text"
          autoComplete="nickname"
          maxLength={10}
          value={nickname}
          onChange={(event) => setNickname(event.target.value)}
          style={inputStyle}
        />
      </div>
    </div>
  );
}
export default ProfileEditNickname;
