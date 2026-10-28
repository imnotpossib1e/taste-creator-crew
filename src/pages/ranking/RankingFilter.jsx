import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { sortOptions } from './rankingConstants';
import './rankingFilter.css';

// 정렬 드롭다운
function SortDropdown({ sortBy, setSortBy }) {
  const [isOpen, setIsOpen] = useState(false);
  // 목록에 없는 값이면(옵션이 바뀌는 등) 첫 번째 옵션을 보여줘서 화면이 깨지지 않게
  const selected =
    sortOptions.find(option => option.value === sortBy) ?? sortOptions[0];

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
      <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
    </div>
  );
}

export default RankingFilter;
