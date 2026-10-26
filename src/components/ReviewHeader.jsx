import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './reviewHeader.css';

function ReviewHeader({ title }) {
  const navigate = useNavigate();

  return (
    <header className="reviewHeader">
      <button
        type="button"
        className="reviewHeaderClose"
        aria-label="닫기"
        onClick={() => navigate(-1)}
      >
        <X size={22} />
      </button>
      <h1>{title}</h1>

      <div className="reviewHeaderSpacer" aria-hidden="true" />
    </header>
  );
}

export default ReviewHeader;
