import { useRef } from 'react';
import { Camera, User } from 'lucide-react';
import { uploadProfileImage } from '../../hook/user';
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

    // 같은 파일 다시 선택할 수 있도록 초기화
    e.target.value = '';

    // 버킷(profile-image)에 올리고 받은 주소를 그대로 미리보기·저장에 쓴다
    // ponytail: 저장 안 하고 나가면 올린 파일이 버킷에 남음, 신경 쓰이면 저장 시점에 업로드
    uploadProfileImage(file)
      .then(onImageChange)
      .catch((err) => {
        console.error(err);
        alert('이미지를 업로드하지 못했습니다. 다시 시도해 주세요.');
      });
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
          // 프로필 이미지가 없으면 사람 아이콘 (마이페이지 프로필과 같은 방식)
          <User size={44} color="#9ca3af" aria-hidden="true" />
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
        <Camera className="camera-icon" size={18} color="#ffffff" />
      </div>
    </div>
  );
}

export default ProfileEditAvatar;
