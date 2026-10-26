import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../auth';
import SignupAppBar from './SignupAppBar';
import SignupEmailField from './SignupEmailField';
import SignupPasswordField from './SignupPasswordField';
import SignupPasswordConfirm from './SignupPasswordConfirm';
import SignupNicknameField from './SignupNicknameField';
import SignupAgreements from './SignupAgreements';
import './signup.css';

// 회원가입 페이지 - 섹션 컴포넌트를 순서대로 조립
function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [nickname, setNickname] = useState('');
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    location: false,
  });
  const [feedback, setFeedback] = useState('');

  const passwordRules = {
    longEnough: password.length >= 8,
    hasLetter: /[a-zA-Z]/.test(password),
    hasNumber: /\d/.test(password),
  };
  const allAgreed =
    agreements.terms && agreements.privacy && agreements.location;

  const updateAgreement = (name, checked) => {
    setAgreements((current) => ({ ...current, [name]: checked }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFeedback('올바른 이메일 주소를 입력해 주세요.');
      return;
    }
    if (
      !passwordRules.longEnough ||
      !passwordRules.hasLetter ||
      !passwordRules.hasNumber
    ) {
      setFeedback('비밀번호는 8자 이상이며 영문과 숫자를 포함해야 합니다.');
      return;
    }
    if (password !== passwordConfirmation) {
      setFeedback('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!nickname.trim()) {
      setFeedback('닉네임을 입력해 주세요.');
      return;
    }
    if (!agreements.terms || !agreements.privacy) {
      setFeedback('필수 약관에 동의해 주세요.');
      return;
    }

    const result = await signUp({ email, password, nickname });
    if (!result.ok) {
      setFeedback(result.message);
      return;
    }
    navigate('/login');
  };

  const showAgreementNotice = () => {
    setFeedback('약관 문서가 연결되지 않았습니다.');
  };

  return (
    <div className="layer-1 page7">
      <div className="frame-8">
        <SignupAppBar />
        <form className="frame-8-2" onSubmit={handleSubmit}>
          <div className="frame-8-3">
            <div className="frame-8-4">
              <div className="frame-10">
                <SignupEmailField email={email} setEmail={setEmail} />
                <SignupPasswordField
                  password={password}
                  setPassword={setPassword}
                  passwordRules={passwordRules}
                />
                <SignupPasswordConfirm
                  password={password}
                  passwordConfirmation={passwordConfirmation}
                  setPasswordConfirmation={setPasswordConfirmation}
                />
                <SignupNicknameField nickname={nickname} setNickname={setNickname} />
              </div>
              <SignupAgreements
                agreements={agreements}
                setAgreements={setAgreements}
                allAgreed={allAgreed}
                updateAgreement={updateAgreement}
                showAgreementNotice={showAgreementNotice}
              />
            </div>
            <div className="vector-11"></div>
          </div>
          <button
            className="component-1"
            type="submit"
            style={{ border: 0, cursor: 'pointer', font: 'inherit' }}
          >
            <p className="layer--16">가입하기</p>
          </button>
          <p role="status" aria-live="polite">
            {feedback}
          </p>
        </form>
      </div>
    </div>
  );
}
export default Signup;
