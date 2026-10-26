import { Camera, X } from 'lucide-react';
import './reviewPhotos.css';

// 사진 업로드 연결 전까지 피그마처럼 2장 고정
const placeholderPhotos = [1, 2];

function ReviewPhotos() {
  return (
    <div className="reviewPhotos">
      <h2>
        사진 <span>최대 5장</span>
      </h2>

      <div className="reviewPhotosRow">
        <button
          type="button"
          className="reviewPhotosAdd"
          aria-label="사진 추가"
        >
          <Camera size={22} aria-hidden="true" />
          <span>{placeholderPhotos.length}/5</span>
        </button>

        {placeholderPhotos.map(id => (
          <div key={id} className="reviewPhotosItem">
            <button type="button" aria-label="사진 삭제">
              <X size={10} aria-hidden="true" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewPhotos;
