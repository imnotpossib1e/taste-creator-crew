import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { changePassword } from '../../auth';
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
  const [feedback, setFeedback] = useState('');

  const passwordRules = {
    longEnough: newPassword.length >= 8,
    hasLetter: /[a-zA-Z]/.test(newPassword),
    hasNumber: /\d/.test(newPassword),
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

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

    const result = await changePassword({ currentPassword, newPassword });
    if (!result.ok) {
      setFeedback(result.message);
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
                  setCurrentPassword={setCurrentPassword}
                  showPasswords={showPasswords}
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
          <p role="status" aria-live="polite">
            {feedback}
          </p>
        </form>
      </div>
    </div>
  );
}
export default PasswordChange;
