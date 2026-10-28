import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './storeDetailHeader.css';

function StoreDetailHeader() {
  const navigate = useNavigate();

  return (
    <header className="storeDetailHeader">
      <button
        type="button"
        className="storeDetailClose"
        aria-label="닫기"
        onClick={() => navigate(-1)}
      >
        <X size={22} />
      </button>
      <h1>연남 국밥집</h1>
      <div className="storeDetailSpacer" aria-hidden="true" />
    </header>
  );
}

export default StoreDetailHeader;
