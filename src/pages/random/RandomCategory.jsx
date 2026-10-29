import { randomCategories } from './randomConstants';
import './randomCategory.css';

function RandomCategory({ selectedCategory, setSelectedCategory }) {
  return (
    <div className="randomCategory">
      <div className="randomCategoryChips">
        {randomCategories.map(item => (
          <button
            key={item}
            type="button"
            className={selectedCategory === item ? 'active' : ''}
            onClick={() => setSelectedCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export default RandomCategory;
