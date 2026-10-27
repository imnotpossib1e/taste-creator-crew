import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/superbase';
import PasswordChangeAppBar from './PasswordChangeAppBar';
import PasswordChangeIntro from './PasswordChangeIntro';
import PasswordChangeCurrent from './PasswordChangeCurrent';
import PasswordChangeNew from './PasswordChangeNew';
import PasswordChangeConfirm from './PasswordChangeConfirm';
import PasswordChangeShowToggle from './PasswordChangeShowToggle';
import './passwordChange.css';

// 비밀번호 변경 페이지 - 섹션 컴포넌트를 순서대로 조립
function PasswordChange() {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  // 현재 비밀번호가 DB와 다를 때 입력칸에 ✗ 표시
  const [currentPasswordWrong, setCurrentPasswordWrong] = useState(false);
  // 피드백 메시지는 화면 문구 대신 사이트 알림(alert)으로 표시
  const setFeedback = (message) => {
    if (message) window.alert(message);
  };

  const passwordRules = {
    longEnough: newPassword.length >= 8,
    hasLetter: /[a-zA-Z]/.test(newPassword),
    hasNumber: /\d/.test(newPassword),
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setCurrentPasswordWrong(false);

    if (!currentPassword) {
      setFeedback('현재 비밀번호를 입력해 주세요.');
      return;
    }
    if (
      !passwordRules.longEnough ||
      !passwordRules.hasLetter ||
      !passwordRules.hasNumber
    ) {
      setFeedback('새 비밀번호는 8자 이상이며 영문과 숫자를 포함해야 합니다.');
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

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setFeedback('로그인이 필요합니다.');
      return;
    }
    // 현재 비밀번호 확인: 같은 계정으로 다시 로그인해 본다
    const { error: verifyError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: currentPassword,
    });
    if (verifyError) {
      setCurrentPasswordWrong(true);
      setFeedback('현재 비밀번호가 올바르지 않습니다.');
      return;
    }
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      setFeedback(error.message || '비밀번호 변경에 실패했습니다.');
      return;
    }
    window.alert('비밀번호가 변경되었습니다.');
    navigate('/profileEdit');
  };

  return (
    <div className="layer-2 page10">
      <div className="frame-8">
        <PasswordChangeAppBar />
        <PasswordChangeIntro />
        <form className="frame-8-2" onSubmit={handleSubmit}>
          <div className="frame-8-3">
            <div className="frame-8-4">
              <div className="frame-10">
                <PasswordChangeCurrent
                  currentPassword={currentPassword}
                  setCurrentPassword={(value) => {
                    setCurrentPassword(value);
                    setCurrentPasswordWrong(false);
                  }}
                  showPasswords={showPasswords}
                  wrong={currentPasswordWrong}
                />
                <PasswordChangeNew
                  newPassword={newPassword}
                  setNewPassword={setNewPassword}
                  showPasswords={showPasswords}
                  passwordRules={passwordRules}
                />
                <PasswordChangeConfirm
                  newPassword={newPassword}
                  passwordConfirmation={passwordConfirmation}
                  setPasswordConfirmation={setPasswordConfirmation}
                  showPasswords={showPasswords}
                />
                <PasswordChangeShowToggle
                  showPasswords={showPasswords}
                  setShowPasswords={setShowPasswords}
                />
              </div>
            </div>
          </div>
          <button
            className="component-1"
            type="submit"
            style={{ border: 0, cursor: 'pointer', font: 'inherit' }}
          >
            <p className="layer--9">수정하기</p>
          </button>
        </form>
      </div>
    </div>
  );
}
export default PasswordChange;
