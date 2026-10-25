import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { sortOptions } from './rankingConstants';
import './rankingFilter.css';

// 정렬 드롭다운
function SortDropdown({ sortBy, setSortBy }) {
  const [isOpen, setIsOpen] = useState(false);
  const selected = sortOptions.find(option => option.value === sortBy);

  const handleSelect = value => {
    setSortBy(value);
    setIsOpen(false);
  };

  return (
    <div className="rankingSort">
      <button
        type="button"
        className={isOpen ? 'rankingSortButton open' : 'rankingSortButton'}
        aria-expanded={isOpen}
        onClick={() => setIsOpen(prev => !prev)}
      >
        {selected.label} <ChevronDown size={14} />
      </button>

      {isOpen && (
        <ul className="rankingSortMenu">
          {sortOptions.map(option => (
            <li key={option.value}>
              <button
                type="button"
                className={option.value === sortBy ? 'active' : ''}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function RankingFilter({ sortBy, setSortBy }) {
  return (
    <div className="rankingFilter">
      <p>10월 13일부터 19일까지</p>
      <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
    </div>
  );
}

export default RankingFilter;
