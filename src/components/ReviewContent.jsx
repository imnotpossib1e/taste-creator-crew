import './reviewContent.css';

function ReviewContent({ content, setContent }) {
  return (
    <div className="reviewContent">
      <label htmlFor="reviewContent">내용</label>
      <textarea
        id="reviewContent"
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="맛, 양, 웨이팅은 어땠나요?"
        maxLength={500}
      />
      <span className="reviewContentCount">{content.length}/500</span>
    </div>
  );
}

export default ReviewContent;
