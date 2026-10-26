import { useRef } from 'react';
import './profileEditAvatar.css';

// 프로필 아바타 + 카메라 아이콘 (로컬 이미지 추가 기능)
function ProfileEditAvatar({ profileImage, onImageChange }) {
  const fileInputRef = useRef(null);

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 선택할 수 있습니다.');
      return;
    }

    // 5MB 용량 제한
    if (file.size > 5 * 1024 * 1024) {
      alert('5MB 이하의 이미지 파일만 업로드할 수 있습니다.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        onImageChange(event.target.result);
      }
    };
    reader.readAsDataURL(file);

    // 같은 파일 다시 선택할 수 있도록 초기화
    e.target.value = '';
  };

  return (
    <div className="group-9">
      <div className="vector-2">
        {profileImage ? (
          <img
            src={profileImage}
            alt="프로필 이미지"
            className="profile-avatar-img"
          />
        ) : (
          <div className="avatar-placeholder" />
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      <div
        className="group-8"
        role="button"
        tabIndex={0}
        aria-label="프로필 이미지 변경"
        onClick={handleCameraClick}
        onKeyDown={handleKeyDown}
      >
        <div className="vector-3"></div>
        <div className="group">
          <div className="vector-4"></div>
          <div className="vector-5"></div>
        </div>
      </div>
    </div>
  );
}

export default ProfileEditAvatar;
