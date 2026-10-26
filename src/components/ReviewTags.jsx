import { reviewTags } from './reviewConstants';
import './reviewTags.css';

function ReviewTags({ tags, onToggleTag }) {
  return (
    <div className="reviewTags">
      <h2>
        좋았던 점 <span>선택</span>
      </h2>

      <div className="reviewTagsChips">
        {reviewTags.map(item => {
          const isSelected = tags.includes(item);
          return (
            <button
              key={item}
              type="button"
              className={isSelected ? 'active' : ''}
              aria-pressed={isSelected}
              onClick={() => onToggleTag(item)}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ReviewTags;
