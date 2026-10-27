import StoreDetailHeader from './StoreDetailHeader';
import StoreInfo from './StoreInfo';
import StoreReviews from './StoreReviews';
import StoreBottomBar from './StoreBottomBar';
import './storeDetail.css';
import { useState } from 'react';
import BookmarkSheet from './BookmarkSheet';
import { useNavigate, useParams } from 'react-router-dom';
import { selectRestaurants } from '../../redux/store.js';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/authSlice.js';
import { insertBookmark } from '../../hook/bookmark.js';

// Postgres 중복 에러 코드 - bookmarks의 (user_id, place_id) unique 제약에 걸림 = 이미 북마크한 가게
const UNIQUE_VIOLATION = '23505';

function StoreDetail() {
  const [isBookmarkSheetOpen, setIsBookmarkSheetOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const restaurants = useSelector(selectRestaurants);
  const restaurant = restaurants.find(item => item.id === id);
  const user = useSelector(selectCurrentUser);

  const handleWriteReview = () => {
    navigate(`/reviewWrite/${id}`);
  };

  const handleSaveBookmark = async ({ memo }) => {
    if (!user) {
      alert('로그인이 필요해요.');
      navigate('/login');
      return;
    }
    try {
      await insertBookmark({
        userId: user.id,
        placeId: id,
        placeName: restaurant.name,
        content: memo,
      });
      // 저장에 성공했을 때만 닫는다 - 실패하면 쓴 메모가 남아 있어야 다시 시도 가능
      setIsBookmarkSheetOpen(false);
    } catch (err) {
      console.error(err);
      if (err.code === UNIQUE_VIOLATION) {
        alert('이미 저장한 가게예요.');
      } else {
        alert('북마크를 저장하지 못했어요. 다시 시도해 주세요.');
      }
    }
  };

  return (
    <div className="storeDetail">
      <StoreDetailHeader />

      <div className="storeDetailContent">
        <StoreInfo placeId={id} />
        <StoreReviews placeId={id} onWriteReview={handleWriteReview} />
      </div>

      <StoreBottomBar
        onBookmarkClick={() => setIsBookmarkSheetOpen(true)}
        onWriteReview={handleWriteReview}
      />
      {isBookmarkSheetOpen && restaurant && (
        <BookmarkSheet
          restaurant={restaurant}
          onClose={() => setIsBookmarkSheetOpen(false)}
          onSave={handleSaveBookmark}
        />
      )}
    </div>
  );
}

export default StoreDetail;
