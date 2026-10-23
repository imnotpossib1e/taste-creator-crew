import { Search } from 'lucide-react';
import './searchinput.css';

// 검색창
function SearchInput({ placeholder, value, onChange, onKeyDown }) {
  return (
    <div className="searchInput">
      <span>
        <Search color={'#b0abab'} size={20} />
      </span>
      <input
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
