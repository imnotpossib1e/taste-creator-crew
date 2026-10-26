import { useNavigate } from 'react-router-dom';
import './myPageProfile.css';

// 프로필 카드 - 아바타, 닉네임/동네, 프로필 수정 버튼
function MyPageProfile({
  nickname,
  setNickname,
  neighborhood,
  setNeighborhood,
  profileEditing,
  setProfileEditing,
  setFeedback,
  profileImage,
}) {
  const navigate = useNavigate();
  return (
    <div className="frame-8-3">
      <div className="frame-8-4">
        <div className="avatar">
          {profileImage ? (
            <img
              src={profileImage}
              alt={nickname}
              className="avatar-image"
            />
          ) : null}
        </div>
        <div className="frame-8-5">
          {profileEditing ? (
            <>
              <input
                aria-label="닉네임"
                value={nickname}
                maxLength={10}
                onChange={(event) => setNickname(event.target.value)}
                style={{ width: 140, boxSizing: 'border-box' }}
              />
              <input
                aria-label="내 동네"
                value={neighborhood}
                onChange={(event) => setNeighborhood(event.target.value)}
                style={{ width: 140, boxSizing: 'border-box' }}
              />
            </>
          ) : (
            <>
              <p className="layer--2">{nickname}</p>
              <p className="layer--3">{neighborhood}</p>
            </>
          )}
        </div>
      </div>
      <button
        type="button"
        className="frame-21"
        style={{
          background: 'transparent',
          cursor: 'pointer',
          font: 'inherit',
        }}
        onClick={() => {
          if (!profileEditing) {
            navigate('/profileEdit');
            return;
          }
          if (profileEditing && (!nickname.trim() || !neighborhood.trim())) {
            setFeedback('닉네임과 동네를 입력해 주세요.');
            return;
          }
          setProfileEditing((editing) => !editing);
          if (profileEditing) {
            setFeedback(
              '프로필 변경 사항을 이 화면의 로컬 상태에 반영했습니다.',
            );
          }
        }}
      >
        <span className="layer--4">
          {profileEditing ? '저장' : '프로필 수정'}
        </span>
      </button>
    </div>
  );
}
export default MyPageProfile;
