import './homeCategory.css';
// categories: 보여줄 칩 목록 - 탭에 따라 Home에서 정해서 내려준다
function HomeCategory({ categories, selectedCategory, setSelectedCategory }) {
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
