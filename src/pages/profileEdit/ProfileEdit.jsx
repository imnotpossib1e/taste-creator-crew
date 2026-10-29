import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { supabase } from '../../utils/superbase';
import { updateUser as updateUserRow, deleteUser } from '../../hook/user';
import { updateUser, logout } from '../../redux/authSlice';
import ProfileEditAppBar from './ProfileEditAppBar';
import ProfileEditAvatar from './ProfileEditAvatar';
import ProfileEditNickname from './ProfileEditNickname';
import ProfileEditAccount from './ProfileEditAccount';
import './profileEdit.css';

// 프로필 수정 페이지 - 섹션 컴포넌트를 순서대로 조립
function ProfileEdit() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(null);
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [passwordPanelOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  // 피드백 메시지는 화면 문구 대신 사이트 알림(alert)으로 표시
  const setFeedback = message => {
    if (message) window.alert(message);
  };

  // 로그인한 사용자의 프로필을 supabase users 테이블에서 불러온다
  useEffect(() => {
    const loadProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      setEmail(user.email ?? '');
      const { data, error } = await supabase
        .from('users')
        .select('id, nickname, profile_image')
        .eq('auth_id', user.id)
        .single();
      if (error) {
        setFeedback('회원 정보를 불러오지 못했습니다.');
        return;
      }
      setUserId(data.id);
      setNickname(data.nickname);
      setProfileImage(data.profile_image);
    };
    loadProfile();
  }, []);

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
    if (!userId) {
      setFeedback('로그인이 필요합니다.');
      return;
    }
    try {
      await updateUserRow(userId, {
        nickname: nickname.trim(),
        profileImage,
      });
    } catch (err) {
      window.alert('프로필 저장에 실패했습니다.');
      return;
    }
    dispatch(updateUser({ nickname: nickname.trim(), profileImage }));
    window.alert('프로필이 저장되었습니다.');
    navigate('/mypage');
  };

  // 회원 탈퇴 - users 테이블의 회원 행을 삭제하고 로그아웃
  // ponytail: auth 계정은 anon 키로 못 지워 남음(같은 이메일 재가입 불가), 지우려면 DB에 security definer RPC 추가
  const handleWithdraw = async () => {
    if (!userId) {
      setFeedback('로그인이 필요합니다.');
      return;
    }
    if (
      !window.confirm('정말 탈퇴하시겠습니까? 탈퇴 후에는 복구할 수 없습니다.')
    )
      return;
    try {
      await deleteUser(userId);
    } catch (err) {
      window.alert('회원 탈퇴에 실패했습니다.');
      return;
    }
    await supabase.auth.signOut();
    dispatch(logout());
    window.alert('회원 탈퇴가 완료되었습니다.');
    navigate('/login');
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
            <ProfileEditNickname
              nickname={nickname}
              setNickname={setNickname}
            />
          </div>
        </div>
        <div className="frame-10-2">
          <ProfileEditAccount
            email={email}
            passwordPanelOpen={passwordPanelOpen}
            currentPassword={currentPassword}
            setCurrentPassword={setCurrentPassword}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            passwordConfirmation={passwordConfirmation}
            setPasswordConfirmation={setPasswordConfirmation}
            handlePasswordChange={handlePasswordChange}
            onWithdraw={handleWithdraw}
          />
          <button
            type="button"
            className="component-1"
            style={{ border: 0, cursor: 'pointer', font: 'inherit' }}
            onClick={handleProfileSave}
          >
            <p className="layer--14">저장하기</p>
          </button>
        </div>
      </div>
    </div>
  );
}
export default ProfileEdit;
