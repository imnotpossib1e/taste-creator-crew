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

function StoreDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const restaurants = useSelector(selectRestaurants);
  const restaurant = restaurants.find(item => item.id === id);
  // 홈 인기 순위와 같은 북마크 로직 - 저장 여부, 바텀시트, 저장/취소
  const {
    savedIds,
    sheetStore,
    handleBookmarkClick,
    closeSheet,
    saveBookmark,
  } = useBookmark();

  const handleWriteReview = () => {
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
