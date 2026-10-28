import { useRef } from 'react';
import { Camera, X } from 'lucide-react';
import './reviewPhotos.css';

// 사진을 긴 쪽 800px 이하, JPEG 화질 0.75로 줄인 새 File을 만든다
// 휴대폰 원본(4000px, 수 MB)은 화면에 비해 너무 커서 미리보기·목록이 버벅이고 업로드도 느림
// 순서: 파일 → Image로 읽기 → 작은 canvas에 그리기 → JPEG로 다시 뽑기
function resizeImage(file) {
  return new Promise((resolve, reject) => {
    const src = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      URL.revokeObjectURL(src);
      // 이미 작은 사진은 키우지 않는다 (최대 1배)
      const scale = Math.min(1, 800 / Math.max(img.width, img.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      const ctx = canvas.getContext('2d');
      // JPEG는 투명을 못 담아서 PNG 투명 부분이 검게 나오지 않게 흰 배경을 먼저 깐다
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        blob => {
          if (!blob) return reject(new Error('사진을 줄이지 못했어요.'));
          const name = file.name.replace(/\.[^.]+$/, '') + '.jpg';
          resolve(new File([blob], name, { type: 'image/jpeg' }));
        },
        'image/jpeg',
        0.75,
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(src);
      reject(new Error('사진을 읽지 못했어요.'));
    };
    img.src = src;
  });
}

// photos: { file, url } 배열 (기존 사진은 file 없이 url만) - 상태는 ReviewForm이 갖고 있어서 등록할 때 한꺼번에 모은다
function ReviewPhotos({ photos, setPhotos }) {
  // 브라우저 기본 파일 버튼은 숨기고, 카메라 버튼이 대신 클릭한다 (ProfileEditAvatar와 같은 방식)
  const fileInputRef = useRef(null);

  const handleFileChange = async e => {
    // files는 배열이 아니라서 filter/slice를 쓰려고 배열로 바꾼다
    const images = Array.from(e.target.files).filter(file =>
      file.type.startsWith('image/'),
    );
    // 최대 5장 - 이미 고른 장수만큼 빼고 남은 칸만큼만 추가
    const remain = 5 - photos.length;
    if (images.length > remain) {
      alert('사진은 최대 5장까지 올릴 수 있어요.');
    }

    // 같은 사진을 지웠다가 다시 고를 수 있게 초기화 (값이 같으면 onChange가 안 불림)
    // 아래 await 동안 input이 그대로면 안 되니까 파일을 다 꺼낸 지금 비운다
    e.target.value = '';

    try {
      // 고를 때 바로 줄여 두면 미리보기도 가볍고, 업로드도 줄인 파일이 올라간다
      const resized = await Promise.all(
        images.slice(0, remain).map(resizeImage),
      );
      // 미리보기 주소는 고를 때 한 번만 만든다 (렌더링마다 만들면 계속 새 주소가 쌓임)
      const added = resized.map(file => ({
        file,
        url: URL.createObjectURL(file),
      }));
      setPhotos(prev => [...prev, ...added]);
    } catch (err) {
      console.error(err);
      alert('사진을 불러오지 못했어요. 다른 사진을 선택해 주세요.');
    }
  };

  const handleRemove = index => {
    // 새로 고른 사진의 임시 주소만 브라우저 메모리에서 해제 (기존 사진 주소는 진짜 인터넷 주소)
    if (photos[index].file) URL.revokeObjectURL(photos[index].url);
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="reviewPhotos">
      <h2>
        사진{' '}
        <span style={{ fontSize: '12px', marginLeft: '4px' }}>최대 5장</span>
      </h2>

      <div className="reviewPhotosRow">
        <input
          type="file"
          accept="image/*"
          multiple
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <button
          type="button"
          className="reviewPhotosAdd"
          aria-label="사진 추가"
          disabled={photos.length >= 5}
          onClick={() => fileInputRef.current.click()}
        >
          <Camera size={22} aria-hidden="true" />
          <span>{photos.length}/5</span>
        </button>

        {photos.map((photo, index) => (
          <div key={photo.url} className="reviewPhotosItem">
            <img src={photo.url} alt={`첨부 사진 ${index + 1}`} />
            <button
              type="button"
              aria-label="사진 삭제"
              onClick={() => handleRemove(index)}
            >
              <X size={10} aria-hidden="true" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewPhotos;
