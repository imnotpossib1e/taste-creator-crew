import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSession } from '../../auth';
import './Page9.css';

export function Component1() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState(getSession()?.nickname ?? '연남산책');
  const [selectedFoods, setSelectedFoods] = useState(['한식', '일식']);
  const [passwordPanelOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [feedback, setFeedback] = useState('');

  const foodOptions = [
    { name: '한식', className: 'frame-23' },
    { name: '카페', className: 'frame-27' },
    { name: '중식', className: 'frame-23-2' },
    { name: '일식', className: 'frame-24' },
    { name: '양식', className: 'frame-25' },
    { name: '분식', className: 'frame-26' },
  ];

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

  const handleProfileSave = () => {
    if (!nickname.trim()) {
      setFeedback('닉네임을 입력해 주세요.');
      return;
    }
    setFeedback('프로필 변경 사항을 이 화면의 로컬 상태에 반영했습니다.');
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
  const buttonStyle = {
    border: 0,
    background: 'transparent',
    padding: 0,
    cursor: 'pointer',
  };

  return (
    <div className="layer-1 page9">
      <div className="app-bar">
        <button
          type="button"
          className="frame"
          aria-label="뒤로가기"
          style={{ border: 0, background: 'transparent', padding: 0, cursor: 'pointer' }}
          onClick={() => navigate(-1)}
        >
          <div className="vector"></div>
        </button>
        <p className="layer-">프로필 수정</p>
        <div className="spacer"></div>
      </div>
      <div className="frame-10">
        <div className="frame-11">
          <div className="group-9">
            <div className="vector-2"></div>
            <div className="group-8">
              <div className="vector-3"></div>
              <div className="group">
                <div className="vector-4"></div>
                <div className="vector-5"></div>
              </div>
            </div>
          </div>
          <div className="frame-8">
            <div className="frame-8-2">
              <div className="frame-8-3">
                <label className="layer--2" htmlFor="profile-nickname">
                  닉네임
                </label>
                <p className="layer-4-10">{nickname.length}/10</p>
              </div>
              <div className="frame-12">
                <input
                  id="profile-nickname"
                  className="yeonnam-example-com"
                  type="text"
                  autoComplete="nickname"
                  maxLength={10}
                  value={nickname}
                  onChange={(event) => setNickname(event.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>
            <div className="frame-8-4">
              <div className="frame-8-5">
                <p className="layer--3">좋아하는 음식 여러 개 선택</p>
                <p className="layer--4">
                  랜덤 추천에서 이 종류를 더 자주 골라드려요.
                </p>
              </div>
              <div className="frame-8-6">
                {foodOptions.map(({ name, className }, index) => {
                  const selected = selectedFoods.includes(name);
                  return (
                    <button
                      key={name}
                      type="button"
                      className={className}
                      style={{
                        font: 'inherit',
                        cursor: 'pointer',
                        background: selected ? '#0f766e' : '#ffffff',
                        border: `1px solid ${selected ? '#0f766e' : '#e5e7eb'}`,
                      }}
                      aria-pressed={selected}
                      onClick={() => toggleFood(name)}
                    >
                      <span
                        className={`layer--${5 + index}`}
                        style={{ color: selected ? '#ffffff' : '#111827' }}
                      >
                        {name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="frame-10-2">
          <div className="frame-8-7">
            <div className="vector-6"></div>
            <div className="frame-8-8">
              <p className="layer--11">이메일</p>
              <p className="yeonnam-example-com-2">yeonnam@example.com</p>
            </div>
            <div className="vector-7"></div>
            <button
              type="button"
              className="frame-8-9"
              style={buttonStyle}
              aria-expanded={passwordPanelOpen}
              onClick={() => navigate('/page10')}
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
