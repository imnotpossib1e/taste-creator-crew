// StarRating.jsx
import { Star } from 'lucide-react';
import './starRating.css';

export default function StarRating({ rating = 0, size = 16 }) {
  const value = Math.max(0, Math.min(5, Number(rating) || 0));

  return (
    <div className="starRating" aria-label={`별점 ${value.toFixed(1)}점`}>
      {[0, 1, 2, 3, 4].map(i => {
        // 이 별이 채워질 비율 (0 ~ 100%)
        const fill = Math.max(0, Math.min(1, value - i)) * 100;
        return (
          <span
            key={i}
            className="starItem"
            style={{ width: size, height: size }}
          >
            <Star size={size} className="starEmpty" />
            <span className="starFillWrap" style={{ width: `${fill}%` }}>
              <Star size={size} className="starFilled" />
            </span>
          </span>
        );
      })}
      <span className="starValue">{value.toFixed(1)}</span>
    </div>
  );
}
