import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../auth';
import './Page7.css';

export function Component1() {
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
    navigate('/page6');
  };

  const showAgreementNotice = () => {
    setFeedback('약관 문서가 연결되지 않았습니다.');
  };
  const linkButtonStyle = {
    border: 0,
    background: 'transparent',
    padding: 0,
    cursor: 'pointer',
  };

  const inputStyle = {
    width: '100%',
    minWidth: 0,
    height: '100%',
    boxSizing: 'border-box',
    border: 0,
    outline: 0,
    background: 'transparent',
    color: '#111827',
  };
  const checkboxStyle = {
    width: 18,
    height: 18,
    margin: 0,
    cursor: 'pointer',
  };
  return (
    <div className="layer-1 page7">
      <div className="frame-8">
        <div className="app-bar">
          <button
            type="button"
            className="frame-17"
            aria-label="뒤로가기"
            style={{ border: 0, background: 'transparent', padding: 0, cursor: 'pointer' }}
            onClick={() => navigate('/page6')}
          >
            <div className="vector"></div>
          </button>
          <p className="layer-">회원가입</p>
          <div className="spacer"></div>
        </div>
        <form className="frame-8-2" onSubmit={handleSubmit}>
          <div className="frame-8-3">
            <div className="frame-8-4">
              <div className="frame-10">
                <div className="frame-10-2">
                  <label className="layer--2" htmlFor="signup-email">
                    이메일
                  </label>
                  <div className="frame-12">
                    <input
                      id="signup-email"
                      className="yeonnam-example-com"
                      type="email"
                      autoComplete="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      style={inputStyle}
                    />
                  </div>
                </div>
                <div className="frame-10-3">
                  <div className="frame-11">
                    <label className="layer--3" htmlFor="signup-password">
                      비밀번호
                    </label>
                    <div className="frame-12-2">
                      <input
                        id="signup-password"
                        className="yeonnam-example-com-2"
                        type="password"
                        autoComplete="new-password"
                        placeholder="비밀번호 입력"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        style={inputStyle}
                      />
                    </div>
                  </div>
                  <div className="frame-10-4">
                    <div className="frame-10-5">
                      <div className="group">
                        <div
                          className="vector-2"
                          style={{
                            borderColor: passwordRules.longEnough
                              ? '#0f766e'
                              : '#9ca3af',
                          }}
                        ></div>
                      </div>
                      <p
                        className="layer-8"
                        style={{
                          color: passwordRules.longEnough
                            ? '#0f766e'
                            : '#9ca3af',
                        }}
                      >
                        8자 이상
                      </p>
                    </div>
                    <div className="frame-11-2">
                      <div className="group-2">
                        <div
                          className="vector-3"
                          style={{
                            borderColor: passwordRules.hasLetter
                              ? '#0f766e'
                              : '#9ca3af',
                          }}
                        ></div>
                      </div>
                      <p
                        className="layer--4"
                        style={{
                          color: passwordRules.hasLetter
                            ? '#0f766e'
                            : '#9ca3af',
                        }}
                      >
                        영문 포함
                      </p>
                    </div>
                    <div className="frame-12-3">
                      <div className="group-3">
                        <div
                          className="vector-4"
                          style={{
                            borderColor: passwordRules.hasNumber
                              ? '#0f766e'
                              : '#9ca3af',
                          }}
                        ></div>
                      </div>
                      <p
                        className="layer--5"
                        style={{
                          color: passwordRules.hasNumber
                            ? '#0f766e'
                            : '#9ca3af',
                        }}
                      >
                        숫자 포함
                      </p>
                    </div>
                  </div>
                </div>
                <div className="frame-11-3">
                  <div className="frame-11-4">
                    <div className="frame-10-6">
                      <label
                        className="layer--6"
                        htmlFor="signup-password-confirm"
                      >
                        비밀번호 확인
                      </label>
                      <div className="group-4">
                        <div
                          className="vector-5"
                          style={{
                            borderColor:
                              passwordConfirmation &&
                              passwordConfirmation === password
                                ? '#0f766e'
                                : '#9ca3af',
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="frame-12-4">
                      <input
                        id="signup-password-confirm"
                        className="yeonnam-example-com-3"
                        type="password"
                        autoComplete="new-password"
                        placeholder="비밀번호 다시 입력"
                        value={passwordConfirmation}
                        onChange={(event) =>
                          setPasswordConfirmation(event.target.value)
                        }
                        style={inputStyle}
                      />
                    </div>
                  </div>
                </div>
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
              </div>
              <div className="frame-10-8">
                <p className="layer--8">약관 동의</p>
                <div className="frame-10-9">
                  <div className="frame-10-10">
                    <label className="frame-14">
                      <input
                        type="checkbox"
                        checked={allAgreed}
                        onChange={(event) => {
                          const checked = event.target.checked;
                          setAgreements({
                            terms: checked,
                            privacy: checked,
                            location: checked,
                          });
                        }}
                        style={checkboxStyle}
                        aria-label="전체 동의"
                      />
                    </label>
                    <p className="layer--9">전체 동의</p>
                  </div>
                  <div className="vector-7"></div>
                  <div className="frame-10-11">
                    <div className="frame-10-12">
                      <div className="frame-8-5">
                        <label className="frame-14-2">
                          <input
                            type="checkbox"
                            checked={agreements.terms}
                            onChange={(event) =>
                              updateAgreement('terms', event.target.checked)
                            }
                            style={checkboxStyle}
                            aria-label="이용약관 동의"
                          />
                        </label>
                        <p className="layer--10">이용약관 (필수)</p>
                      </div>
                      <button
                        type="button"
                        className="layer--11"
                        style={linkButtonStyle}
                        onClick={showAgreementNotice}
                      >
                        보기
                      </button>
                    </div>
                    <div className="frame-10-13">
                      <div className="frame-8-6">
                        <label className="frame-15">
                          <input
                            type="checkbox"
                            checked={agreements.privacy}
                            onChange={(event) =>
                              updateAgreement('privacy', event.target.checked)
                            }
                            style={checkboxStyle}
                            aria-label="개인정보 수집 및 이용 동의"
                          />
                        </label>
                        <p className="layer--12">
                          개인정보 수집 및 이용 (필수)
                        </p>
                      </div>
                      <button
                        type="button"
                        className="layer--13"
                        style={linkButtonStyle}
                        onClick={showAgreementNotice}
                      >
                        보기
                      </button>
                    </div>
                    <div className="frame-10-14">
                      <div className="frame-8-7">
                        <label className="frame-16">
                          <input
                            type="checkbox"
                            checked={agreements.location}
                            onChange={(event) =>
                              updateAgreement('location', event.target.checked)
                            }
                            style={checkboxStyle}
                            aria-label="위치 정보 이용 동의"
                          />
                        </label>
                        <p className="layer--14">위치 정보 이용 (선택)</p>
                      </div>
                      <button
                        type="button"
                        className="layer--15"
                        style={linkButtonStyle}
                        onClick={showAgreementNotice}
                      >
                        보기
                      </button>
                    </div>
                  </div>
                </div>
              </div>
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
