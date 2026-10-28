import { Search, X } from 'lucide-react';
import './searchinput.css';

// 검색창
function SearchInput({
  ref,
  placeholder,
  value,
  onChange,
  onKeyDown,
  isSearching,
  clearSearch,
}) {
  return (
    <div className="searchInput">
      {isSearching ? (
        <button
          type="button"
          className="searchInput-clear"
          onClick={clearSearch}
          aria-label="검색 지우기"
        >
          <X color={'#b0abab'} size={20} />
        </button>
      ) : (
        <span>
          <Search color={'#b0abab'} size={20} />
        </span>
      )}
      <input
        ref={ref}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}

export default SearchInput;
