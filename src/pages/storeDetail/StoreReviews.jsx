import { Star } from 'lucide-react';
import { stores } from '../../data/stores';
import './storeReviews.css';

// 임시 데이터
const reviews = [
  {
    id: 1,
    author: '국밥러버',
    date: '10월 12일',
    rating: 5,
    content:
      '국물이 진한데 잡내가 없어요. 부추무침이랑 같이 먹으면 잘 어울려요. 평일 점심에 10분 정도 기다렸습니다.',
    photoCount: 2,
  },
  {
    id: 2,
    author: '연남산책',
    date: '10월 8일',
    rating: 4,
    content:
      '수육 국밥 양이 넉넉해요. 김치가 조금 짰지만 전체적으로 만족합니다.',
    photoCount: 2,
  },
];

// 0부터 count-1까지의 배열 - 별/사진 자리를 개수만큼 그릴 때 사용
const range = count => Array.from({ length: count }, (_, index) => index);

// 별 5개 중 rating개만 채움
function ReviewStars({ rating }) {
  return (
    <div className="reviewStars" aria-label={`별점 ${rating}점`}>
      {range(5).map(index => {
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

// 리뷰 하나
function ReviewItem({ review }) {
  return (
    <li className="reviewItem">
      <div className="reviewAuthor">
        <strong>{review.author}</strong>
        <span>{review.date}</span>
      </div>
      <ReviewStars rating={review.rating} />
      <p className="reviewContent">{review.content}</p>
      <div className="reviewPhotos">
        {range(review.photoCount).map(index => (
          <div key={index} />
        ))}
      </div>
    </li>
  );
}

function StoreReviews() {
  // 임시 연남 국밥집(id 1)
  const store = stores.find(item => item.id === 1);

  return (
    <section className="storeReviews">
      <div className="storeReviewsHeader">
        <h2>리뷰 {store.reviews}</h2>
        <button type="button">리뷰 쓰기</button>
      </div>

      <ul>
        {reviews.map(review => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </ul>
    </section>
  );
}

export default StoreReviews;
