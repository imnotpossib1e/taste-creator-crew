import ReviewKeyword from './ReviewKeyword';
import './storeInfo.css';

function StoreInfo({ placeId, reviews }) {
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
      <div className="storeInfoBlocker">
        <div className="storeReviewPoint">
          {goodPoints.length > 0 &&
            goodPoints.map(point => (
              <ReviewKeyword key={point} point={point} />
            ))}
        </div>
      </div>
    </section>
  );
}

export default StoreInfo;
