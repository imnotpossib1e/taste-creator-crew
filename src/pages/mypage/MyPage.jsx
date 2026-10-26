import { useEffect, useState } from 'react';
import { getSession } from '../../auth';
import MyPageAppBar from './MyPageAppBar';
import MyPageProfile from './MyPageProfile';
import MyPageTabs from './MyPageTabs';
import MyPageReviews from './MyPageReviews';
import MyPagePlaces from './MyPagelists';
import MyPageSettings from './MyPageSettings';
import './myPage.css';
import { initialReviews } from './myPageConstants';

// 마이페이지 - 섹션 컴포넌트를 순서대로 조립
function MyPage() {
  const [activeTab, setActiveTab] = useState('reviews');
  const [nickname, setNickname] = useState(getSession()?.nickname ?? '연남산책');
  const [neighborhood, setNeighborhood] = useState('내 동네 연남동');
  const [profileEditing, setProfileEditing] = useState(false);
  const [reviews, setReviews] = useState(initialReviews);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [draftReview, setDraftReview] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setInstallPrompt(event);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  const beginEditing = (review) => {
    setEditingReviewId(review.id);
    setDraftReview(review.text);
    setFeedback('');
  };

  const saveReview = (reviewId) => {
    if (!draftReview.trim()) {
      setFeedback('리뷰 내용을 입력해 주세요.');
      return;
    }

    setReviews((current) =>
      current.map((review) =>
        review.id === reviewId
          ? { ...review, text: draftReview.trim() }
          : review,
      ),
    );
    setEditingReviewId(null);
  };

  const deleteReview = (reviewId) => {
    setReviews((current) => current.filter((review) => review.id !== reviewId));
    setFeedback('리뷰를 이 화면에서 삭제했습니다.');
  };

  const handleInstall = async () => {
    if (!installPrompt) {
      setFeedback(
        '이 브라우저에서 설치 안내를 사용할 수 없습니다. 브라우저 메뉴에서 홈 화면에 추가를 선택해 주세요.',
      );
      return;
    }

    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;
    setFeedback(
      choice.outcome === 'accepted'
        ? '앱 설치를 진행합니다.'
        : '앱 설치를 취소했습니다.',
    );
    setInstallPrompt(null);
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
          />
          <div className="frame-8-6">
            <MyPageTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              reviewCount={reviews.length}
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
              <MyPagePlaces activeTab={activeTab} />
            )}
          </div>
        </div>
      </div>
      <div className="divider"></div>
      <MyPageSettings
        notificationsEnabled={notificationsEnabled}
        setNotificationsEnabled={setNotificationsEnabled}
        setFeedback={setFeedback}
        handleInstall={handleInstall}
        feedback={feedback}
      />
    </div>
  );
}
export default MyPage;
