import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/superbase';
import { createUser } from '../../hook/user';
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

    const normalizedEmail = email.trim().toLowerCase();
    const { data, error } = await supabase.auth.signUp({
      email: normalizedEmail,
      password,
    });
    // 이메일 인증이 켜져 있으면 중복 가입 시 error 없이 identities 가 빈 배열로 온다
    if (error?.code === 'user_already_exists' || data?.user?.identities?.length === 0) {
      setFeedback('이미 가입된 이메일입니다.');
      return;
    }
    // supabase 서버가 실제로 메일을 받을 수 없는 주소로 판단하면 거부한다
    if (error?.code === 'email_address_invalid') {
      setFeedback('사용할 수 없는 이메일 주소입니다. 실제로 사용하는 이메일을 입력해 주세요.');
      return;
    }
    if (error) {
      setFeedback(error.message || '회원가입에 실패했습니다.');
      return;
    }

    try {
      await createUser({
        authId: data.user.id,
        email: normalizedEmail,
        nickname: nickname.trim(),
      });
    } catch (err) {
      setFeedback(err.message || '회원 정보 저장에 실패했습니다.');
      return;
    }
    // 가입 후 자동 로그인된 세션은 정리하고 로그인 화면으로 보낸다
    await supabase.auth.signOut();
    navigate('/login');
  };

  const showAgreementNotice = () => {
    setFeedback('약관 문서가 연결되지 않았습니다.');
  };

  return (
    <div className="layer-1 page7">
      <div className="frame-8">
        <SignupAppBar />
        <div className="frame-8-2">
          <div className="frame-8-3">
            <div className="frame-8-4">
              {/* 입력 필드만 폼으로 묶고, 약관 동의는 폼 밖에 둔다 */}
              <form id="signup-form" className="frame-10" onSubmit={handleSubmit}>
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
              </form>
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
            form="signup-form"
            style={{ border: 0, cursor: 'pointer', font: 'inherit' }}
          >
            <p className="layer--16">가입하기</p>
          </button>
          <p role="status" aria-live="polite">
            {feedback}
          </p>
        </div>
      </div>
    </div>
  );
}
export default Signup;
