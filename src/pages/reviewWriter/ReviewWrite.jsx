import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ReviewForm from '../../components/ReviewForm.jsx';
import { selectRestaurants } from '../../redux/store.js';
import { useState } from 'react';
import { insertMyReview } from '../../hook/review.js';

function ReviewWrite() {
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  // 주소(/reviewWrite/:id)의 카카오 장소 id로 redux에서 가게를 찾는다
  const { id } = useParams();
  const restaurants = useSelector(selectRestaurants);
  const restaurant = restaurants.find(item => item.id === id);

  // 새 리뷰를 Supabase에 저장하고, 성공하면 이 가게 상세로 돌아간다
  // 저장 중에 Enter 등으로 다시 제출되면 무시 (중복 등록 방지)
  const handleSubmit = async review => {
    if (isSaving) return;

    setIsSaving(true);
    try {
      await insertMyReview(review);
      navigate(`/store/${id}`);
    } catch (err) {
      console.error(err);
      alert('리뷰를 저장하지 못했어요. 다시 시도해 주세요.');
    } finally {
      setIsSaving(false);
    }
  };

  // 못 찾으면 ReviewForm이 restaurant.description에서 에러 나지 않게 안내만
  if (!restaurant) {
    return (
      <p className="reviewFormEmpty">
        가게 정보를 불러올 수 없어요. 지도에서 다시 선택해 주세요.
      </p>
    );
  }

  return (
    <ReviewForm
      title="리뷰 쓰기"
      submitLabel="등록하기"
      onSubmit={handleSubmit}
      restaurant={restaurant}
      isSaving={isSaving}
    />
  );
}

export default ReviewWrite;
