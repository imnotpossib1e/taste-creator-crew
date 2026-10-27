import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ReviewForm from '../../components/ReviewForm.jsx';
import { selectRestaurants } from '../../redux/store.js';

function ReviewWrite() {
  // 주소(/reviewWrite/:id)의 카카오 장소 id로 redux에서 가게를 찾는다
  const { id } = useParams();
  const restaurants = useSelector(selectRestaurants);
  const restaurant = restaurants.find(item => item.id === id);

  // 새 리뷰 추가 - 저장 로직 연결 전까지 콘솔 확인만
  const handleSubmit = review => {
    console.log('리뷰 등록:', review);
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
    />
  );
}

export default ReviewWrite;
