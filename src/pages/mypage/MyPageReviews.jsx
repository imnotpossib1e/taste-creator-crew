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
  return (
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
  );
}
export default MyPageReviews;
