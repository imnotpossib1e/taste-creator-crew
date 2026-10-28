import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ReviewForm from '../../components/ReviewForm.jsx';
import { selectRestaurants } from '../../redux/store.js';
import { selectCurrentUser } from '../../redux/authSlice.js';
import { getReview, updateMyReview } from '../../hook/review.js';

// 수정할 리뷰 하나를 DB에서 불러온다 (StoreReviews의 useStoreReviews와 같은 패턴)
// review: 불러오기 전 null / isError: 못 불러왔을 때 true
function useReview(reviewId) {
  const [review, setReview] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // 응답이 오기 전에 다른 리뷰로 바뀌면 이전 응답이 덮어쓰지 않게
    let ignore = false;

    const fetchReview = async () => {
      try {
        const data = await getReview(reviewId);
        if (ignore) return;
        setReview(data);
      } catch (err) {
        console.error(err);
        if (!ignore) setIsError(true);
      }
    };
    fetchReview();

    return () => {
      ignore = true;
    };
  }, [reviewId]);

  return { review, isError };
}

function ReviewEdit() {
  // 주소(/reviewEdit/:id)의 id는 리뷰 id
  const { id } = useParams();
  const { review, isError } = useReview(id);
  // 리뷰의 place_id(카카오 가게 id)로 redux에서 가게를 찾는다
  // 마이페이지에서 들어오면 다른 동네 가게라 redux에 없을 수 있어서, 그때는 리뷰에 저장된 이름으로 대신 채운다
  // (종류는 알 수 없어서 빈 값 → 가게 카드는 기본 아이콘)
  const restaurants = useSelector(selectRestaurants);
  const restaurant =
    restaurants.find(item => item.id === review?.place_id) ??
    (review && {
      id: review.place_id,
      name: review.place_name,
      category_group: '',
    });
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);

  // 수정한 리뷰를 Supabase에 저장하고, 성공하면 들어온 페이지(가게 상세 또는 마이페이지)로 돌아간다
  // 저장 중에 Enter 등으로 다시 제출되면 무시 (중복 저장 방지)
  const handleSubmit = async newReview => {
    if (!user) {
      alert('로그인이 필요해요.');
      navigate('/login');
      return;
    }

    if (isSaving) return;

    setIsSaving(true);
    try {
      await updateMyReview(id, newReview);
      navigate(-1);
    } catch (err) {
      // 내 리뷰가 아니거나 RLS에 막히면 수정된 행이 없어서 .single()이 에러를 낸다
      console.error(err);
      alert('리뷰를 수정하지 못했어요. 다시 시도해 주세요.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isError) {
    return <p className="reviewFormEmpty">리뷰를 불러오지 못했어요.</p>;
  }

  // 리뷰가 오기 전에 폼을 그리면 useState 시작값이 빈 값으로 굳어서, 다 불러온 뒤에 그린다
  if (!review) {
    return <p className="reviewFormEmpty">리뷰를 불러오는 중이에요.</p>;
  }

  return (
    <ReviewForm
      title="리뷰 수정"
      submitLabel="수정하기"
      onSubmit={handleSubmit}
      restaurant={restaurant}
      initialReview={review}
      isSaving={isSaving}
    />
  );
}

export default ReviewEdit;
