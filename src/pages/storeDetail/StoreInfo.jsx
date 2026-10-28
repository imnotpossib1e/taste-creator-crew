import { Bookmark } from 'lucide-react';
import ReviewKeyword from './ReviewKeyword';
import StarRating from './StarRating';
import './storeInfo.css';

function StoreInfo({ placeId, reviews, restaurant }) {
  const goodPoints = [
    ...new Set(
      reviews.flatMap(r =>
        (r.good_points ?? '')
          .split(',')
          .map(p => p.trim())
          .filter(Boolean),
      ),
    ),
  ];

  return (
    <section className="storeInfo">
      <iframe
        className="storeInfoFrame"
        src={`https://place.map.kakao.com/${placeId}`}
        title="가게 정보"
        tabIndex={-1}
      />
      <div className="storeReviewBlocker">
        <div className="storeDetailInfoWrap">
          <div className="storeDataInfo">
            <StarRating rating={restaurant.rating_avg} />
            <div className="bookmarkWrap">
              <Bookmark size={'14px'} />
              <span>{restaurant.bookmark_count}</span>
            </div>
          </div>
          <div className="storeReviewPoint">
            {goodPoints.length > 0 &&
              goodPoints.map(point => (
                <ReviewKeyword key={point} point={point} />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default StoreInfo;
