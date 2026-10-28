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
import { useEffect, useState } from 'react';
import { getStoreReviews } from '../../hook/review.js';

function StoreDetail() {
  const [reviews, setReviews] = useState([]);
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

  // 가게(placeId)가 바뀔 때마다 Supabase에서 리뷰 목록을 다시 불러온다 (MainMap 상점 불러오기와 같은 패턴)
  useEffect(() => {
    // 응답이 오기 전에 다른 가게로 바뀌면 이전 응답이 덮어쓰지 않게
    let ignore = false;

    const fetchReviews = async () => {
      try {
        const data = await getStoreReviews(id);
        if (ignore) return;
        setReviews(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchReviews();
  }, []);

  // 새로고침 등으로 redux 가게 목록이 비면 restaurant가 없어서, 아래에서 restaurant.name을 읽다가 화면이 깨진다
  // 리뷰 쓰기/수정 페이지처럼 안내만 보여준다 - 훅 규칙 때문에 모든 훅 아래, return 위에 둔다
  if (!restaurant) {
    return (
      <p className="storeDetailEmpty">
        가게 정보를 불러올 수 없어요. 지도에서 다시 선택해 주세요.
      </p>
    );
  }

  return (
    <div className="storeDetail">
      <StoreDetailHeader restaurantName={restaurant.name} />

      <div className="storeDetailContent">
        <StoreInfo placeId={id} reviews={reviews} restaurant={restaurant} />
        <StoreReviews placeId={id} reviews={reviews} />
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
