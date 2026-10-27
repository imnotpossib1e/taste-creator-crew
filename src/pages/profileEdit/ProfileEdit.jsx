import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getSession, updateProfile } from '../../auth';
import { updateUser } from '../../redux/authSlice';
import ProfileEditAppBar from './ProfileEditAppBar';
import ProfileEditAvatar from './ProfileEditAvatar';
import ProfileEditNickname from './ProfileEditNickname';
import ProfileEditFoodSelect from './ProfileEditFoodSelect';
import ProfileEditAccount from './ProfileEditAccount';
import './profileEdit.css';

// 프로필 수정 페이지 - 섹션 컴포넌트를 순서대로 조립
function ProfileEdit() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [nickname, setNickname] = useState(getSession()?.nickname ?? '연남산책');
  const [selectedFoods, setSelectedFoods] = useState(
    Array.isArray(getSession()?.foods) ? getSession().foods : ['한식', '일식'],
  );
  const [profileImage, setProfileImage] = useState(getSession()?.profileImage ?? null);
  const [passwordPanelOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [feedback, setFeedback] = useState('');

  const toggleFood = (food) => {
    setSelectedFoods((current) =>
      current.includes(food)
        ? current.filter((item) => item !== food)
        : [...current, food],
    );
  };

  const handlePasswordChange = () => {
    if (!currentPassword) {
      setFeedback('현재 비밀번호를 입력해 주세요.');
      return;
    }
    if (
      newPassword.length < 8 ||
      !/[a-zA-Z]/.test(newPassword) ||
      !/\d/.test(newPassword)
    ) {
      setFeedback('비밀번호는 8자 이상이며 영문과 숫자를 포함해야 합니다.');
      return;
    }
    if (newPassword !== passwordConfirmation) {
      setFeedback('새 비밀번호가 일치하지 않습니다.');
      return;
    }
    if (newPassword === currentPassword) {
      setFeedback('현재 비밀번호와 다른 비밀번호를 입력해 주세요.');
      return;
    }

    setFeedback('비밀번호 변경 서버가 연결되지 않아 저장되지 않았습니다.');
  };

  const handleProfileSave = async () => {
    if (!nickname.trim()) {
      setFeedback('닉네임을 입력해 주세요.');
      return;
    }
    const result = await updateProfile({
      nickname,
      foods: selectedFoods,
      profileImage,
    });
    if (!result.ok) {
      setFeedback(result.message);
      return;
    }
    dispatch(updateUser({ nickname, foods: selectedFoods, profileImage }));
    window.alert('프로필이 저장되었습니다.');
    navigate('/mypage');
  };

  return (
    <div className="layer-1 page9">
      <ProfileEditAppBar />
      <div className="frame-10">
        <div className="frame-11">
          <ProfileEditAvatar
            profileImage={profileImage}
            onImageChange={setProfileImage}
          />
          <div className="frame-8">
            <ProfileEditNickname nickname={nickname} setNickname={setNickname} />
            <ProfileEditFoodSelect selectedFoods={selectedFoods} toggleFood={toggleFood} />
          </div>
        </div>
        <div className="frame-10-2">
          <ProfileEditAccount
            email={getSession()?.email ?? ''}
            passwordPanelOpen={passwordPanelOpen}
            currentPassword={currentPassword}
            setCurrentPassword={setCurrentPassword}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            passwordConfirmation={passwordConfirmation}
            setPasswordConfirmation={setPasswordConfirmation}
            handlePasswordChange={handlePasswordChange}
            setFeedback={setFeedback}
          />
          <button
            type="button"
            className="component-1"
            style={{ border: 0, cursor: 'pointer', font: 'inherit' }}
            onClick={handleProfileSave}
          >
            <p className="layer--14">저장하기</p>
          </button>
          <p role="status" aria-live="polite">
            {feedback}
          </p>
        </div>
      </div>
    </div>
  );
}
export default ProfileEdit;
