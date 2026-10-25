import { useEffect, useState } from 'react';
import { Bookmark, ThumbsUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getSession, logOut } from '../../auth';
import './Page8.css';

const initialReviews = [
  {
    id: 1,
    restaurant: '연남 국밥집',
    text: '국물이 진한데 잡내가 없어요. 부추무침이랑 같이 먹으면 잘 어울려요.',
    date: '10월 12일',
  },
  {
    id: 2,
    restaurant: '연남 국밥집',
    text: '국물이 진한데 잡내가 없어요. 부추무침이랑 같이 먹으면 잘 어울려요.',
    date: '10월 12일',
  },
  {
    id: 3,
    restaurant: '연남 국밥집',
    text: '국물이 진한데 잡내가 없어요. 부추무침이랑 같이 먹으면 잘 어울려요.',
    date: '10월 12일',
  },
];

// 좋아요/북마크 목록은 API 연결 전까지 시안용 고정 데이터
const likedPlaces = [1, 2, 3, 4].map((id) => ({
  id,
  name: '연남 국밥집',
  category: '한식',
  rating: 4.6,
  reviewCount: 128,
  likes: 312,
}));

const bookmarkedPlaces = [
  { id: 1, name: '소소한 스시', category: '일식', area: '연남동' },
  ...[2, 3, 4].map((id) => ({
    id,
    name: '소소한 스시',
    category: '일식',
    area: '연남동',
    memo: '친구 생일에 가기',
  })),
];

const buttonStyle = {
  border: 0,
  background: 'transparent',
  padding: 0,
  cursor: 'pointer',
};

export function Component1() {
  const navigate = useNavigate();
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
    setFeedback('리뷰를 이 화면에서 수정했습니다.');
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

  const tabStyle = (selected) => ({
    ...buttonStyle,
    color: selected ? '#0f766e' : undefined,
    fontWeight: selected ? 700 : undefined,
  });

  return (
    <div className="layer-1 page8">
      <div className="frame-8">
        <div className="app-bar">
          <button
            type="button"
            className="frame-17"
            aria-label="뒤로가기"
            style={{ border: 0, background: 'transparent', padding: 0, cursor: 'pointer' }}
            onClick={() => navigate(-1)}
          >
            <div className="vector"></div>
          </button>
          <p className="layer-">마이페이지</p>
          <div className="spacer"></div>
        </div>
        <div className="frame-8-2">
          <div className="frame-8-3">
            <div className="frame-8-4">
              <div className="avatar"></div>
              <div className="frame-8-5">
                {profileEditing ? (
                  <>
                    <input
                      aria-label="닉네임"
                      value={nickname}
                      maxLength={10}
                      onChange={(event) => setNickname(event.target.value)}
                      style={{ width: 140, boxSizing: 'border-box' }}
                    />
                    <input
                      aria-label="내 동네"
                      value={neighborhood}
                      onChange={(event) => setNeighborhood(event.target.value)}
                      style={{ width: 140, boxSizing: 'border-box' }}
                    />
                  </>
                ) : (
                  <>
                    <p className="layer--2">{nickname}</p>
                    <p className="layer--3">{neighborhood}</p>
                  </>
                )}
              </div>
            </div>
            <button
              type="button"
              className="frame-21"
              style={{
                background: 'transparent',
                cursor: 'pointer',
                font: 'inherit',
              }}
              onClick={() => {
                if (!profileEditing) {
                  navigate('/page9');
                  return;
                }
                if (profileEditing && (!nickname.trim() || !neighborhood.trim())) {
                  setFeedback('닉네임과 동네를 입력해 주세요.');
                  return;
                }
                setProfileEditing((editing) => !editing);
                if (profileEditing) {
                  setFeedback(
                    '프로필 변경 사항을 이 화면의 로컬 상태에 반영했습니다.',
                  );
                }
              }}
            >
              <span className="layer--4">
                {profileEditing ? '저장' : '프로필 수정'}
              </span>
            </button>
          </div>
          <div className="frame-8-6">
            <div className="tabs" role="tablist" aria-label="마이페이지 목록">
              <div className="frame-8-7">
                <div className="frame-8-8">
                  <div className="frame-8-9">
                    <button
                      type="button"
                      className="frame-10"
                      role="tab"
                      aria-selected={activeTab === 'reviews'}
                      style={tabStyle(activeTab === 'reviews')}
                      onClick={() => setActiveTab('reviews')}
                    >
                      <span
                        className="layer-3"
                        style={{
                          color:
                            activeTab === 'reviews' ? '#0f766e' : '#6b7280',
                          fontWeight: activeTab === 'reviews' ? 700 : 400,
                        }}
                      >
                        내 리뷰 {reviews.length}
                      </span>
                    </button>
                    <button
                      type="button"
                      className="layer-3-2"
                      role="tab"
                      aria-selected={activeTab === 'liked'}
                      style={tabStyle(activeTab === 'liked')}
                      onClick={() => setActiveTab('liked')}
                    >
                      좋아요 누른 곳 {likedPlaces.length}
                    </button>
                    <button
                      type="button"
                      className="layer-5"
                      role="tab"
                      aria-selected={activeTab === 'bookmarks'}
                      style={tabStyle(activeTab === 'bookmarks')}
                      onClick={() => setActiveTab('bookmarks')}
                    >
                      북마크 {bookmarkedPlaces.length}
                    </button>
                  </div>
                </div>
                <div className="vector-3"></div>
              </div>
            </div>
            {activeTab === 'reviews' ? (
              <div className="frame-8-10" role="tabpanel">
                {reviews.length === 0 ? (
                  <p role="status">작성한 리뷰가 없습니다.</p>
                ) : (
                  reviews.map((review) => (
                    <div className="frame-8-11" key={review.id}>
                      <div className="frame-8-12">
                        <div className="frame-8-13">
                          <p className="layer--5">{review.restaurant}</p>
                          <div className="frame-8-14" aria-label="별점 5점">
                            <div className="vector-4"></div>
                            <div className="vector-5"></div>
                            <div className="vector-6"></div>
                            <div className="vector-7"></div>
                            <div className="vector-8"></div>
                          </div>
                        </div>
                        {editingReviewId === review.id ? (
                          <textarea
                            aria-label="리뷰 수정"
                            value={draftReview}
                            onChange={(event) =>
                              setDraftReview(event.target.value)
                            }
                            rows={3}
                            style={{
                              width: '100%',
                              boxSizing: 'border-box',
                              font: 'inherit',
                            }}
                          />
                        ) : (
                          <p className="layer--6">{review.text}</p>
                        )}
                      </div>
                      <div className="frame-8-15">
                        <p className="layer-10-12">{review.date}</p>
                        <div className="frame-8-16">
                          {editingReviewId === review.id ? (
                            <>
                              <button
                                type="button"
                                className="frame-18"
                                style={buttonStyle}
                                onClick={() => saveReview(review.id)}
                              >
                                <span className="layer--7">저장</span>
                              </button>
                              <button
                                type="button"
                                className="frame-19"
                                style={buttonStyle}
                                onClick={() => setEditingReviewId(null)}
                              >
                                <span className="layer--8">취소</span>
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                type="button"
                                className="frame-18"
                                style={buttonStyle}
                                onClick={() => beginEditing(review)}
                              >
                                <span className="layer--7">수정</span>
                              </button>
                              <button
                                type="button"
                                className="frame-19"
                                style={buttonStyle}
                                onClick={() => deleteReview(review.id)}
                              >
                                <span className="layer--8">삭제</span>
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                      {review.id !== reviews[reviews.length - 1].id && (
                        <div className="vector-9"></div>
                      )}
                    </div>
                  ))
                )}
              </div>
            ) : (
              <ul className="place-list" role="tabpanel">
                {activeTab === 'liked'
                  ? likedPlaces.map((place) => (
                      <li className="place-item" key={place.id}>
                        <span className="place-thumb"></span>
                        <div className="place-info">
                          <p className="place-name">{place.name}</p>
                          <p className="place-meta">
                            <span className="place-category">
                              {place.category}
                            </span>
                            별점 {place.rating} 리뷰 {place.reviewCount}
                          </p>
                        </div>
                        <span className="place-count">
                          <ThumbsUp size={14} />
                          {place.likes}
                        </span>
                      </li>
                    ))
                  : bookmarkedPlaces.map((place) => (
                      <li className="place-item" key={place.id}>
                        <span className="place-thumb"></span>
                        <div className="place-info">
                          <p className="place-name">{place.name}</p>
                          <p className="place-meta">
                            <span className="place-category">
                              {place.category}
                            </span>
                            {place.area}
                          </p>
                          {place.memo && (
                            <p className="place-memo">{place.memo}</p>
                          )}
                        </div>
                        <Bookmark size={16} fill="#111827" />
                      </li>
                    ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className="divider"></div>
      <div className="settings-menu">
        <div className="frame-8-27">
          <div className="frame-8-28">
            <p className="layer--17">새 투표 알림</p>
            <button
              type="button"
              className="frame-20"
              style={{
                ...buttonStyle,
                background: notificationsEnabled ? '#0f766e' : '#9ca3af',
                padding: notificationsEnabled
                  ? '3px 3px 3px 21px'
                  : '3px 21px 3px 3px',
              }}
              role="switch"
              aria-checked={notificationsEnabled}
              aria-label="새 투표 알림"
              onClick={() => {
                setNotificationsEnabled((enabled) => !enabled);
                setFeedback(
                  notificationsEnabled
                    ? '화면 내 새 투표 알림 설정을 껐습니다. 실제 알림은 연결되지 않았습니다.'
                    : '화면 내 새 투표 알림 설정을 켰습니다. 실제 알림은 연결되지 않았습니다.',
                );
              }}
            >
              <div className="vector-21"></div>
            </button>
          </div>
          <div className="vector-22"></div>
          <button
            type="button"
            className="frame-8-29"
            style={{
              ...buttonStyle,
              background: 'transparent',
              width: '100%',
            }}
            onClick={handleInstall}
          >
            <span className="layer--18">홈 화면에 앱 추가</span>
            <span className="group">
              <span className="vector-23"></span>
            </span>
          </button>
          <div className="vector-24"></div>
          <button
            type="button"
            className="layer--19"
            style={buttonStyle}
            onClick={() => {
              logOut();
              navigate('/page6');
            }}
          >
            로그아웃
          </button>
          <p role="status" aria-live="polite">
            {feedback}
          </p>
        </div>
      </div>
    </div>
  );
}
