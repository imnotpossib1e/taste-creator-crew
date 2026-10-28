import StoreDetailHeader from './StoreDetailHeader';
import StoreInfo from './StoreInfo';
import StoreReviews from './StoreReviews';
import StoreBottomBar from './StoreBottomBar';
import './storeDetail.css';
import BookmarkSheet from './BookmarkSheet';
import { useNavigate, useParams } from 'react-router-dom';
import { selectRestaurants } from '../../redux/store.js';
import { useSelector } from 'react-redux';
import { useBookmark } from '../../hook/useBookmark.js';
import { selectCurrentUser } from '../../redux/authSlice.js';

function StoreDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const restaurants = useSelector(selectRestaurants);
  const restaurant = restaurants.find(item => item.id === id);
  const user = useSelector(selectCurrentUser);
  // 홈 인기 순위와 같은 북마크 로직 - 저장 여부, 바텀시트, 저장/취소
  const {
    savedIds,
    sheetStore,
    handleBookmarkClick,
    closeSheet,
    saveBookmark,
  } = useBookmark();

  // 리뷰 쓰기 버튼(하단 바, 리뷰 목록 위) - 다 쓰고 나서 막히지 않게 들어가기 전에 로그인 확인
  // 주소로 바로 들어오는 경우를 위해 ReviewWrite의 등록 시 확인도 그대로 둔다
  const handleWriteReview = () => {
    if (!user) {
      alert('로그인이 필요해요.');
      navigate('/login');
      return;
    }
    navigate(`/reviewWrite/${id}`);
  };

  return (
    <div className="storeDetail">
      <StoreDetailHeader />

      <div className="storeDetailContent">
        <StoreInfo placeId={id} />
        <StoreReviews placeId={id} onWriteReview={handleWriteReview} />
      </div>

      <StoreBottomBar
        isSaved={savedIds.includes(id)}
        // 가게 정보가 없으면(지도를 안 거침) 저장할 이름이 없어서 무시
        onBookmarkClick={() => restaurant && handleBookmarkClick(restaurant)}
        onWriteReview={handleWriteReview}
      />
      {sheetStore && (
        <BookmarkSheet
          restaurant={sheetStore}
          onClose={closeSheet}
          onSave={saveBookmark}
        />
      )}
    </div>
  );
}

export default StoreDetail;
