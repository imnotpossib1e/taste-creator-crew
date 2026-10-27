import { Search } from 'lucide-react';
import './searchBar.css';
import SearchInput from '../../components/SearchInput';

export default function SearchBar() {
  return (
    <div className="search-bar-wrap">
      <SearchInput placeholder={'식당을 입력하세요'} />
    </div>
  );
}
