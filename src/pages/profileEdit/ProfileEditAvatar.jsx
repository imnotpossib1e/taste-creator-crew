import { useRef } from 'react';
import { Camera } from 'lucide-react';
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
      const dataUrl = event.target?.result;
      if (typeof dataUrl !== 'string') return;
      // DB(profile_image) 저장 용량을 줄이기 위해 이미지를 256px 이하 JPEG로 줄여서 저장
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, 256 / Math.max(img.width, img.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext('2d');
        // JPEG는 투명을 지원하지 않아 검은 배경이 되므로 흰색으로 먼저 채움
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        onImageChange(canvas.toDataURL('image/jpeg', 0.85));
      };
      img.onerror = () => alert('이미지를 읽지 못했습니다. 다른 파일을 선택해 주세요.');
      img.src = dataUrl;
    };
    reader.onerror = () => {
      alert('이미지를 읽지 못했습니다. 다른 파일을 선택해 주세요.');
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
        <Camera className="camera-icon" size={18} color="#ffffff" />
      </div>
    </div>
  );
}

export default ProfileEditAvatar;
