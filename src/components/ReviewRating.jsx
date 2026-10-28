import { Star } from 'lucide-react';
import { ratingErrorMessage, ratingLabels } from './reviewConstants';
import './reviewRating.css';

const starIndexes = Array.from({ length: 5 }, (_, index) => index);

// 별점 선택 - 누른 별까지 채움 (index는 0부터, 점수는 1부터라 +1)
function ReviewRating({ rating, setRating, ratingError }) {
  return (
    <div className="reviewRating">
      <h2>별점</h2>

      <div className="reviewRatingRow">
        <div className="reviewRatingStars" aria-label="별점 선택">
          {starIndexes.map(index => {
            const color = index < rating ? '#f59e0b' : '#e5e7eb';
            return (
              <button
                key={index}
                type="button"
                aria-label={`${index + 1}점`}
                onClick={() => setRating(index + 1)}
              >
                <Star size={34} color={color} fill={color} aria-hidden="true" />
              </button>
            );
          })}
        </div>
        <span>{ratingLabels[rating]}</span>
      </div>

      {/* 별 줄(가로 flex) 밖, 아래에 둬야 별이 밀리지 않음 / role="alert" - 스크린리더가 바로 읽어줌 */}
      {ratingError && (
        <p className="reviewRatingError" role="alert">
          {ratingErrorMessage}
        </p>
      )}
    </div>
  );
}

export default ReviewRating;
