import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import { selectCurrentUser } from '../../redux/authSlice.js';
import { deleteMyReview, getStoreReviews } from '../../hook/review.js';
import './storeReviews.css';

const MAX_STARS = 5;

// 0부터 count-1까지의 배열 - 별을 개수만큼 그릴 때 사용
const range = count => Array.from({ length: count }, (_, index) => index);

// DB의 created_at('2026-10-27T06:41:…')을 '10월 27일'로 - getMonth()는 0부터라 +1
function formatDate(createdAt) {
  const date = new Date(createdAt);
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
}

// DB에 JSON 글자('["https://...", ...]')로 저장한 image_url을 주소 배열로
// 사진 기능 전에 쓴 리뷰는 image_url이 null이라 빈 배열로
function toImageUrls(imageUrl) {
  return imageUrl ? JSON.parse(imageUrl) : [];
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
// 사진은 버킷(review-image)에 올라간 주소를 그대로 <img>로 그린다
// isMine: 내가 쓴 리뷰일 때만 수정/삭제 버튼을 보여준다
function ReviewItem({ review, isMine, onEdit, onDelete }) {
  const imageUrls = toImageUrls(review.image_url);

  return (
    <li className="reviewItem">
      <div className="reviewAuthor">
        <strong>{review.users?.nickname ?? '알 수 없음'}</strong>
        <span>{formatDate(review.created_at)}</span>
      </div>
      <ReviewStars rating={review.rating} />
      <p className="reviewText">{review.content}</p>
      {imageUrls.length > 0 && (
        <div className="reviewItemPhotos">
          {imageUrls.map((url, index) => (
            <img key={url} src={url} alt={`리뷰 사진 ${index + 1}`} />
          ))}
        </div>
      )}
      {isMine && (
        <div className="reviewActions">
          <button type="button" onClick={() => onEdit(review.id)}>
            수정
          </button>
          <button type="button" onClick={() => onDelete(review.id)}>
            삭제
          </button>
        </div>
      )}
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

  // 삭제한 리뷰를 목록에서 바로 빼려고 setReviews도 같이 돌려준다
  return { reviews, setReviews };
}

function StoreReviews({ placeId, onWriteReview }) {
  const { reviews, setReviews } = useStoreReviews(placeId);
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  // 수정 페이지 주소에는 가게 id가 아니라 리뷰 id를 넣는다
  const handleEdit = reviewId => {
    navigate(`/reviewEdit/${reviewId}`);
  };

  // DB에서 지운 뒤 성공했을 때만 화면 목록에서도 뺀다 (다시 불러오지 않아도 바로 반영)
  const handleDelete = async reviewId => {
    if (!confirm('리뷰를 삭제할까요?')) return;
    try {
      await deleteMyReview(reviewId);
      setReviews(prev => prev.filter(review => review.id !== reviewId));
    } catch (err) {
      console.error(err);
      alert('리뷰를 삭제하지 못했어요. 다시 시도해 주세요.');
    }
  };

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
            <ReviewItem
              key={review.id}
              review={review}
              // 로그아웃 상태면 user가 null이라 ?.로 비교 (항상 false)
              isMine={user?.id === review.user_id}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

export default StoreReviews;
