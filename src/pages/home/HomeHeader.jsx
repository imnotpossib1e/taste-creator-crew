import { ChevronDown, Search } from 'lucide-react';
import './homeHeader.css';

function HomeHeader() {
  return (
    <header className="homeHeader">
      <button className="homeLocation">
        연남동 <ChevronDown size={16} />
      </button>

      <button className="homeSearch" aria-label="검색">
        <Search size={24} />
      </button>
    </header>
  );
}

export default HomeHeader;
