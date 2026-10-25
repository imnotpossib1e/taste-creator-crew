import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './rankingHeader.css';

function RankingHeader() {
  const navigate = useNavigate();

  return (
    <header className="rankingHeader">
      <button
        type="button"
        className="rankingBack"
        aria-label="뒤로가기"
        onClick={() => navigate('/home')}
      >
        <ChevronLeft size={24} />
      </button>
      <h1>인기 순위</h1>
    </header>
  );
}

export default RankingHeader;
