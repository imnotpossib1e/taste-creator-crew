import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Page10.css';

export function Component2() {
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

  const handleSubmit = (event) => {
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

    navigate('/page9');
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
  return (
    <div className="layer-2 page10">
      <div className="frame-8">
        <div className="app-bar">
          <button
            type="button"
            className="frame-17"
            aria-label="뒤로가기"
            style={{ border: 0, background: 'transparent', padding: 0, cursor: 'pointer' }}
            onClick={() => navigate(-1)}
          >
            <div className="vector"></div>
          </button>
          <p className="layer-">비밀번호 변경</p>
          <div className="spacer"></div>
        </div>
        <p className="layer--2">안전을 위해 현재 비밀번호를 먼저 확인할게요.</p>
        <form className="frame-8-2" onSubmit={handleSubmit}>
          <div className="frame-8-3">
            <div className="frame-8-4">
              <div className="frame-10">
                <div className="frame-10-2">
                  <label className="layer--3" htmlFor="current-password">
                    현재 비밀번호
                  </label>
                  <div className="frame-12">
                    <input
                      id="current-password"
                      className="yeonnam-example-com"
                      type={showPasswords ? 'text' : 'password'}
                      autoComplete="current-password"
                      placeholder="현재 비밀번호 입력"
                      value={currentPassword}
                      onChange={(event) =>
                        setCurrentPassword(event.target.value)
                      }
                      style={inputStyle}
                    />
                  </div>
                </div>
                <div className="frame-10-3">
                  <div className="frame-11">
                    <div className="frame-10-4">
                      <label className="layer--4" htmlFor="new-password">
                        새 비밀번호
                      </label>
                      <div className="group">
                        <div className="vector-2"></div>
                      </div>
                    </div>
                    <div className="frame-12-2">
                      <input
                        id="new-password"
                        className="yeonnam-example-com-2"
                        type={showPasswords ? 'text' : 'password'}
                        autoComplete="new-password"
                        placeholder="새 비밀번호 입력"
                        value={newPassword}
                        onChange={(event) => setNewPassword(event.target.value)}
                        style={inputStyle}
                      />
                    </div>
                  </div>
                  <div className="frame-10-5">
                    <div className="frame-10-6">
                      <div className="group-2">
                        <div
                          className="vector-3"
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
                      <div className="group-3">
                        <div
                          className="vector-4"
                          style={{
                            borderColor: passwordRules.hasLetter
                              ? '#0f766e'
                              : '#9ca3af',
                          }}
                        ></div>
                      </div>
                      <p
                        className="layer--5"
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
                      <div className="group-4">
                        <div
                          className="vector-5"
                          style={{
                            borderColor: passwordRules.hasNumber
                              ? '#0f766e'
                              : '#9ca3af',
                          }}
                        ></div>
                      </div>
                      <p
                        className="layer--6"
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
                    <div className="frame-10-7">
                      <label
                        className="layer--7"
                        htmlFor="confirm-new-password"
                      >
                        새 비밀번호 확인
                      </label>
                      <div className="group-5">
                        <div
                          className="vector-6"
                          style={{
                            borderColor:
                              passwordConfirmation &&
                              passwordConfirmation === newPassword
                                ? '#0f766e'
                                : '#9ca3af',
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="frame-12-4">
                      <input
                        id="confirm-new-password"
                        className="yeonnam-example-com-3"
                        type={showPasswords ? 'text' : 'password'}
                        autoComplete="new-password"
                        placeholder="새 비밀번호 다시 입력"
                        value={passwordConfirmation}
                        onChange={(event) =>
                          setPasswordConfirmation(event.target.value)
                        }
                        style={inputStyle}
                      />
                    </div>
                  </div>
                </div>
                <div className="frame-10-8">
                  <input
                    id="show-passwords"
                    type="checkbox"
                    checked={showPasswords}
                    onChange={(event) =>
                      setShowPasswords(event.target.checked)
                    }
                    style={{ width: 18, height: 18, margin: 0 }}
                  />
                  <label className="layer--8" htmlFor="show-passwords">
                    비밀번호 표시
                  </label>
                </div>
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
