import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCurrentUser } from '../redux/authSlice';
import { updateStats } from '../redux/store';
import {
  deleteBookmarkByPlace,
  getMyBookmarks,
  insertBookmark,
  rememberBookmarkCategory,
} from './bookmark';

// Postgres 중복 에러 코드 - bookmarks의 (user_id, place_id) unique 제약 = 이미 저장한 가게
const UNIQUE_VIOLATION = '23505';

// 내가 저장한 가게 id 목록 - 북마크 아이콘을 채울지 정하는 데 쓴다
function useSavedIds(user) {
  const [savedIds, setSavedIds] = useState([]);

  useEffect(() => {
    if (!user) return;
    // 사용자가 빨리 바뀌면 이전 응답이 최신 결과를 덮어쓰는 것 방지
    let ignore = false;

    getMyBookmarks(user.id)
      .then(bookmarks => {
        if (!ignore) setSavedIds(bookmarks.map(b => b.place_id));
      })
      .catch(err => console.error(err));

    return () => {
      ignore = true;
    };
  }, [user]);

  const addSavedId = id => setSavedIds(prev => [...prev, id]);
  const removeSavedId = id =>
    setSavedIds(prev => prev.filter(savedId => savedId !== id));

  return { savedIds, addSavedId, removeSavedId };
}

// 북마크 (홈 인기 순위, 가게 상세에서 같이 사용)
// 빈 아이콘은 바텀시트로 저장, 채워진 아이콘은 저장 취소
// DB 결과에 맞춰 아이콘과 redux 저장 수를 함께 갱신
export function useBookmark() {
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { savedIds, addSavedId, removeSavedId } = useSavedIds(user);
  // 바텀시트를 띄울 가게 (null이면 닫힘)
  const [sheetStore, setSheetStore] = useState(null);

  // redux 저장 수를 바꾼 값으로 덮어쓰기 - '많이 저장한 곳'이 새로고침 없이 바로 바뀐다
  const setBookmarkCount = (store, count) => {
    dispatch(updateStats({ id: store.id, bookmark_count: count }));
  };

  const cancelBookmark = async store => {
    if (!confirm('저장을 취소할까요?')) return;
    try {
      await deleteBookmarkByPlace({ userId: user.id, placeId: store.id });
      removeSavedId(store.id);
      setBookmarkCount(store, Math.max(store.bookmark_count - 1, 0));
    } catch (err) {
      console.error(err);
      alert('저장을 취소하지 못했어요. 다시 시도해 주세요.');
    }
  };

  // 아이콘 클릭 - 저장 안 한 가게는 시트 열기, 저장한 가게는 저장 취소
  const handleBookmarkClick = store => {
    if (!user) {
      alert('로그인이 필요해요.');
      navigate('/login');
      return;
    }
    if (savedIds.includes(store.id)) {
      cancelBookmark(store);
      return;
    }
    setSheetStore(store);
  };

  const closeSheet = () => setSheetStore(null);

  const saveBookmark = async ({ memo }) => {
    try {
      await insertBookmark({
        userId: user.id,
        placeId: sheetStore.id,
        placeName: sheetStore.name,
        content: memo,
      });
      rememberBookmarkCategory(sheetStore.id, sheetStore.category_group);
      addSavedId(sheetStore.id);
      setBookmarkCount(sheetStore, sheetStore.bookmark_count + 1);
      closeSheet();
    } catch (err) {
      console.error(err);
      if (err.code === UNIQUE_VIOLATION) {
        addSavedId(sheetStore.id);
        alert('이미 저장한 가게예요.');
        closeSheet();
      } else {
        alert('북마크를 저장하지 못했어요. 다시 시도해 주세요.');
      }
    }
  };

  return {
    savedIds,
    sheetStore,
    handleBookmarkClick,
    closeSheet,
    saveBookmark,
  };
}
