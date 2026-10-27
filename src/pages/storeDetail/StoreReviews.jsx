import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { getStoreReviews } from '../../hook/review.js';
import './storeReviews.css';

const MAX_STARS = 5;

// 0부터 count-1까지의 배열 - 별을 개수만큼 그릴 때 사용
const range = count => Array.from({ length: count }, (_, index) => index);

// DB의 created_at('2026-10-27T06:41:…')을 '10월 27일'로 - getMonth()는 0부터라 +1
function formatDate(createdAt) {
  const date = new Date(createdAt);
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
}

// 별 5개 중 rating개만 채움
function ReviewStars({ rating }) {
  return (
    <div className="reviewStars" aria-label={`별점 ${rating}점`}>
      {range(MAX_STARS).map(index => {
        const color = index < rating ? '#f59e0b' : '#e5e7eb';
        return (
          <Star
            key={index}
            size={14}
            color={color}
            fill={color}
            aria-hidden="true"
          />
        );
      })}
    </div>
  );
}

// 리뷰 하나 - 작성자는 users(nickname)로 같이 가져온 값, 탈퇴 등으로 없으면 대체 문구
// 사진은 아직 저장 기능이 없어서 그리지 않음
function ReviewItem({ review }) {
  return (
    <li className="reviewItem">
      <div className="reviewAuthor">
        <strong>{review.users?.nickname ?? '알 수 없음'}</strong>
        <span>{formatDate(review.created_at)}</span>
      </div>
      <ReviewStars rating={review.rating} />
      <p className="reviewText">{review.content}</p>
    </li>
  );
}

// 가게(placeId)가 바뀔 때마다 Supabase에서 리뷰 목록을 다시 불러온다 (MainMap 상점 불러오기와 같은 패턴)
function useStoreReviews(placeId) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // 응답이 오기 전에 다른 가게로 바뀌면 이전 응답이 덮어쓰지 않게
    let ignore = false;

    const fetchReviews = async () => {
      try {
        const data = await getStoreReviews(placeId);
        if (ignore) return;
        setReviews(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchReviews();

    return () => {
      ignore = true;
    };
  }, [placeId]);

  return reviews;
}

function StoreReviews({ placeId, onWriteReview }) {
  const reviews = useStoreReviews(placeId);

  return (
    <section className="storeReviews">
      <div className="storeReviewsHeader">
        <h2>리뷰 {reviews.length}</h2>
        <button type="button" onClick={onWriteReview}>
          리뷰 쓰기
        </button>
      </div>

      {reviews.length === 0 ? (
        <p className="storeReviewsEmpty">
          아직 리뷰가 없어요. 첫 리뷰를 남겨 주세요!
        </p>
      ) : (
        <ul>
          {reviews.map(review => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </ul>
      )}
    </section>
  );
}

export default StoreReviews;
