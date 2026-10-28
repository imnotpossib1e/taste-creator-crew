import { useEffect, useState } from 'react';
import { supabase } from '../../utils/superbase';
import MyPageAppBar from './MyPageAppBar';
import MyPageProfile from './MyPageProfile';
import MyPageTabs from './MyPageTabs';
import MyPageReviews from './MyPageReviews';
import MyPagePlaces from './MyPagelists';
import MyPageSettings from './MyPageSettings';
import './myPage.css';
import {
  getMyReviews2,
  updateMyReview2,
  deleteMyReview2,
} from '../../hook/review';
import {
  getMyBookmarks,
  deleteBookmarkByPlace,
  readBookmarkCategories,
  rememberBookmarkCategory,
} from '../../hook/bookmark';
import { getKakaoCategoryGroup } from '../../hook/kakaoApi';
import { useDispatch, useSelector } from 'react-redux';
import { selectRestaurants, updateStats } from '../../redux/store';

// 마이페이지 - 섹션 컴포넌트를 순서대로 조립
function MyPage() {
  const [activeTab, setActiveTab] = useState('reviews');
  const [nickname, setNickname] = useState('연남산책');
  const [neighborhood, setNeighborhood] = useState('내 동네 연남동');
  const [profileImage, setProfileImage] = useState(null);
  const [profileEditing, setProfileEditing] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [draftReview, setDraftReview] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const dispatch = useDispatch();
  const restaurants = useSelector(selectRestaurants);
  // 이미지용 종류: DB 컬럼 → 지도에서 불러둔 가게 목록 → 저장 때 기억해 둔 값 순서
  const savedCategories = readBookmarkCategories();
  const bookmarkItems = bookmarks.map(b => ({
    ...b,
    category:
      b.category ??
      restaurants.find(r => r.id === b.placeId)?.category_group ??
      savedCategories[b.placeId],
  }));
  // 피드백 메시지는 화면 문구 대신 사이트 알림(alert)으로 표시
  const setFeedback = message => {
    if (message) window.alert(message);
  };

  // 로그인한 사용자의 프로필을 supabase users 테이블에서 불러온다
  useEffect(() => {
    // 화면을 떠난 뒤 늦게 도착한 응답이 state를 바꾸지 않게 한다
    let ignore = false;
    const loadProfile = async () => {
      // getSession은 저장된 세션을 읽어 서버 왕복이 없다 (비로그인은 라우트 로더가 이미 막음)
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const user = session?.user;
      if (!user) return;
      const { data, error } = await supabase
        .from('users')
        .select('id, nickname, profile_image')
        .eq('auth_id', user.id)
        .single();
      if (error) {
        setFeedback('회원 정보를 불러오지 못했습니다.');
        return;
      }
      if (ignore) return;
      setNickname(data.nickname);
      setProfileImage(data.profile_image);

      // 리뷰와 북마크는 서로 상관없으니 동시에 요청한다
      const reviewsReq = getMyReviews2(data.id);
      const bookmarksReq = getMyBookmarks(data.id);

      try {
        const myReviews = await reviewsReq;
        if (ignore) return;
        setReviews(
          myReviews.map(review => {
            const created = new Date(review.created_at);
            return {
              id: review.id,
              restaurant: review.place_name ?? '가게 정보 없음',
              text: review.content,
              date: `${created.getMonth() + 1}월 ${created.getDate()}일`,
            };
          }),
        );
      } catch {
        setFeedback('리뷰를 불러오지 못했습니다.');
      }

      try {
        const myBookmarks = await bookmarksReq;
        if (ignore) return;
        setBookmarks(
          myBookmarks.map(bookmark => ({
            id: bookmark.id,
            name: bookmark.place_name ?? '가게 정보 없음',
            placeId: bookmark.place_id,
            userId: bookmark.user_id,
            category: bookmark.category_group,
            memo: bookmark.content,
          })),
        );

        // 종류를 모르는 북마크(예전에 저장했거나 다른 기기에서 저장)는 목록을 먼저 보여준 뒤
        // 카카오에서 찾아 기억해 두고, 끝나면 이미지를 다시 그린다
        const known = readBookmarkCategories();
        Promise.all(
          myBookmarks
            .filter(b => !known[b.place_id] && b.place_name)
            .map(b =>
              getKakaoCategoryGroup({ id: b.place_id, name: b.place_name })
                .then(group => rememberBookmarkCategory(b.place_id, group))
                .catch(() => {}), // 못 찾으면 기본 이미지
            ),
        ).then(() => {
          if (!ignore) setBookmarks(current => [...current]);
        });
      } catch {
        setFeedback('북마크를 불러오지 못했습니다.');
      }
    };
    loadProfile();
    return () => {
      ignore = true;
    };
  }, []);

  const beginEditing = review => {
    setEditingReviewId(review.id);
    setDraftReview(review.text);
    setFeedback('');
  };

  const saveReview = async reviewId => {
    if (!draftReview.trim()) {
      setFeedback('리뷰 내용을 입력해 주세요.');
      return;
    }
    try {
      await updateMyReview2(reviewId, draftReview.trim());
    } catch {
      setFeedback('리뷰 수정에 실패했습니다.');
      return;
    }

    setReviews(current =>
      current.map(review =>
        review.id === reviewId
          ? { ...review, text: draftReview.trim() }
          : review,
      ),
    );
    setEditingReviewId(null);
  };

  const deleteReview = async reviewId => {
    try {
      await deleteMyReview2(reviewId);
    } catch {
      setFeedback('리뷰 삭제에 실패했습니다.');
      return;
    }
    setReviews(current => current.filter(review => review.id !== reviewId));
    if (editingReviewId === reviewId) setEditingReviewId(null);
    setFeedback('리뷰를 삭제했습니다.');
  };

  const deleteBookmarkItem = async bookmark => {
    if (!window.confirm('저장을 취소할까요?')) return;
    try {
      await deleteBookmarkByPlace({
        userId: bookmark.userId,
        placeId: bookmark.placeId,
      });
    } catch {
      setFeedback('북마크 삭제에 실패했습니다.');
      return;
    }
    rememberBookmarkCategory(bookmark.placeId, null);
    const store = restaurants.find(r => r.id === bookmark.placeId);
    if (store) {
      dispatch(
        updateStats({
          id: store.id,
          bookmark_count: Math.max(store.bookmark_count - 1, 0),
        }),
      );
    }
    setBookmarks(current => current.filter(b => b.id !== bookmark.id));
  };

  // MyPage.jsx
  const handleInstall = async () => {
    const prompt = window.deferredInstallPrompt;
    if (!prompt) {
      setFeedback(
        '이 브라우저에서 설치 안내를 사용할 수 없습니다. 브라우저 메뉴에서 홈 화면에 추가를 선택해 주세요.',
      );
      return;
    }
    await prompt.prompt();
    const choice = await prompt.userChoice;
    setFeedback(
      choice.outcome === 'accepted'
        ? '앱 설치를 진행합니다.'
        : '앱 설치를 취소했습니다.',
    );
    window.deferredInstallPrompt = null;
  };

  return (
    <div className="layer-1 page8">
      <div className="frame-8">
        <MyPageAppBar />
        <div className="frame-8-2">
          <MyPageProfile
            nickname={nickname}
            setNickname={setNickname}
            neighborhood={neighborhood}
            setNeighborhood={setNeighborhood}
            profileEditing={profileEditing}
            setProfileEditing={setProfileEditing}
            setFeedback={setFeedback}
            profileImage={profileImage}
          />
          <div className="frame-8-6">
            <MyPageTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              reviewCount={reviews.length}
              bookmarkCount={bookmarks.length}
            />
            {activeTab === 'reviews' ? (
              <MyPageReviews
                reviews={reviews}
                editingReviewId={editingReviewId}
                setEditingReviewId={setEditingReviewId}
                draftReview={draftReview}
                setDraftReview={setDraftReview}
                beginEditing={beginEditing}
                saveReview={saveReview}
                deleteReview={deleteReview}
              />
            ) : (
              <MyPagePlaces
                bookmarks={bookmarkItems}
                onDelete={deleteBookmarkItem}
              />
            )}
          </div>
        </div>
      </div>
      <div className="divider"></div>
      <MyPageSettings
        notificationsEnabled={notificationsEnabled}
        setNotificationsEnabled={setNotificationsEnabled}
        handleInstall={handleInstall}
      />
    </div>
  );
}
export default MyPage;
