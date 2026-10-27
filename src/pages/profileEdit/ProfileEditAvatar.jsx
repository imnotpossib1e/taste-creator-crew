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
      // profile_image 컬럼이 varchar(500)이라 500자 안에 들어갈 때까지 크기·화질을 낮춘다
      // ponytail: 화질이 매우 낮음, 컬럼을 text로 바꾸거나 Storage URL 저장으로 바꾸면 해결
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        // webp/jpeg는 헤더만 700자 이상이라 500자에 못 들어감 → 작은 png만 가능
        for (const size of [16, 14, 12, 10, 8]) {
          // 가운데를 정사각형으로 잘라 size x size로 축소
          const side = Math.min(img.width, img.height);
          canvas.width = size;
          canvas.height = size;
          ctx.clearRect(0, 0, size, size);
          ctx.drawImage(img, (img.width - side) / 2, (img.height - side) / 2, side, side, 0, 0, size, size);
          const result = canvas.toDataURL('image/png');
          if (result.length <= 500) {
            onImageChange(result);
            return;
          }
        }
        alert('이미지를 충분히 줄이지 못했습니다. 단순한 이미지를 선택해 주세요.');
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
