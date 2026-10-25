import './homeCategory.css';
import { categories } from './homeConstants';

function HomeCategory({ selectedCategory, setSelectedCategory }) {
  return (
    <div className="homeCategory">
      {categories.map(item => (
        <button
          key={item}
          onClick={() => setSelectedCategory(item)}
          className={selectedCategory === item ? 'active' : ''}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export default HomeCategory;
