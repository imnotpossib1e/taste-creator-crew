import { Star } from 'lucide-react';
import './myPageReviews.css';
import { buttonStyle } from './myPageConstants';

// 내 리뷰 목록 - 인라인 수정/삭제
function MyPageReviews({
  reviews,
  editingReviewId,
  setEditingReviewId,
  draftReview,
  setDraftReview,
  beginEditing,
  saveReview,
  deleteReview,
}) {
  if (reviews.length === 0) {
    return (
      <div className="frame-8-10" role="tabpanel">
        <p role="status">작성한 리뷰가 없습니다.</p>
      </div>
    );
  }
  return (
    <div className="frame-8-10" role="tabpanel">
      {reviews.length === 0 ? (
        <p role="status">작성한 리뷰가 없습니다.</p>
      ) : (
        reviews.map(review => (
          <div className="frame-8-11" key={review.id}>
            <div className="frame-8-12">
              <div className="frame-8-13">
                <p className="layer--5">{review.restaurant}</p>
                {/* DB 별점(rating)만큼 채움 - StoreReviews의 ReviewStars와 같은 색 */}
                <div
                  className="frame-8-14"
                  aria-label={`별점 ${review.rating}점`}
                >
                  {[0, 1, 2, 3, 4].map(index => {
                    const color = index < review.rating ? '#f59e0b' : '#e5e7eb';
                    return (
                      <Star
                        key={index}
                        size={14}
                        color={color}
                        fill={color}
                        aria-hidden="true"
                      />
                    );
                  })}
                </div>
              </div>
              {editingReviewId === review.id ? (
                <textarea
                  aria-label="리뷰 수정"
                  value={draftReview}
                  onChange={event => setDraftReview(event.target.value)}
                  rows={3}
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    font: 'inherit',
                  }}
                />
              ) : (
                <div className="myPageReviewWrap">
                  <p className="layer--6">{review.text}</p>
                  {review.images?.length > 0 && (
                    <div className="myPageReviewImageWrap">
                      {review.images.map((url, index) => (
                        <img
                          key={url}
                          src={url}
                          alt={`리뷰 사진 ${index + 1}`}
                          className="myPageReviewPhoto"
                        />
                      ))}
                    </div>
                  )}
                </div>
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
  );
}
export default MyPageReviews;
