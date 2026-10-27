import { useDispatch, useSelector } from 'react-redux';
import './categoryButton.css';
import { setCategory } from '../../redux/store';

const CATEGORIES = ['전체', '한식', '중식', '일식', '양식', '분식', '카페'];
export default function CategoryButton() {
  const dispatch = useDispatch();
  const selected = useSelector(state => state.category);
  return (
    <div className="category-btn">
      {CATEGORIES.map(c => (
        <button
          key={c}
          type="button"
          className={`chip ${selected === c ? 'active' : ''}`}
          onClick={() => dispatch(setCategory(c))}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
