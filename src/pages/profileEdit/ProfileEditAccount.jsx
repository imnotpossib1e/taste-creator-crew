import { useNavigate } from 'react-router-dom';
import './profileEditAccount.css';
import { inputStyle, buttonStyle } from './profileEditConstants';

// 계정 정보 - 이메일, 비밀번호 변경 이동, 회원 탈퇴
function ProfileEditAccount({
  email,
  passwordPanelOpen,
  currentPassword,
  setCurrentPassword,
  newPassword,
  setNewPassword,
  passwordConfirmation,
  setPasswordConfirmation,
  handlePasswordChange,
  setFeedback,
}) {
  const navigate = useNavigate();
  return (
    <div className="frame-8-7">
      <div className="vector-6"></div>
      <div className="frame-8-8">
        <p className="layer--11">이메일</p>
        <p className="yeonnam-example-com-2">{email}</p>
      </div>
      <div className="vector-7"></div>
      <button
        type="button"
        className="frame-8-9"
        style={buttonStyle}
        aria-expanded={passwordPanelOpen}
        onClick={() => navigate('/passwordChange')}
      >
        <span className="layer--12">비밀번호 변경</span>
        <div className="group-2">
          <div className="vector-8"></div>
        </div>
      </button>
      {passwordPanelOpen && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            width: '100%',
          }}
        >
          <label htmlFor="profile-current-password">
            현재 비밀번호
          </label>
          <input
            id="profile-current-password"
            type="password"
            autoComplete="current-password"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
            style={{
              ...inputStyle,
              height: 44,
              border: '1px solid #e5e7eb',
              borderRadius: 8,
              padding: 10,
            }}
          />
          <label htmlFor="profile-new-password">새 비밀번호</label>
          <input
            id="profile-new-password"
            type="password"
            autoComplete="new-password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            style={{
              ...inputStyle,
              height: 44,
              border: '1px solid #e5e7eb',
              borderRadius: 8,
              padding: 10,
            }}
          />
          <label htmlFor="profile-confirm-password">
            새 비밀번호 확인
          </label>
          <input
            id="profile-confirm-password"
            type="password"
            autoComplete="new-password"
            value={passwordConfirmation}
            onChange={(event) =>
              setPasswordConfirmation(event.target.value)
            }
            style={{
              ...inputStyle,
              height: 44,
              border: '1px solid #e5e7eb',
              borderRadius: 8,
              padding: 10,
            }}
          />
          <button
            type="button"
            style={{
              ...buttonStyle,
              background: '#0f766e',
              color: '#ffffff',
              borderRadius: 8,
              padding: 12,
            }}
            onClick={handlePasswordChange}
          >
            비밀번호 확인
          </button>
        </div>
      )}
      <div className="vector-9"></div>
      <button
        type="button"
        className="layer--13"
        style={buttonStyle}
        onClick={() =>
          setFeedback('회원 탈퇴 서버가 연결되지 않았습니다.')
        }
      >
        회원 탈퇴
      </button>
    </div>
  );
}
export default ProfileEditAccount;
