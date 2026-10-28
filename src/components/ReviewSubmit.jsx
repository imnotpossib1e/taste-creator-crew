import './reviewSubmit.css';

// disabled - 저장 중에는 눌리지 않게 (중복 등록 방지)
function ReviewSubmit({ label, disabled }) {
  return (
    <div className="reviewSubmit">
      <button type="submit" disabled={disabled}>
        {label}
      </button>
    </div>
  );
}

export default ReviewSubmit;
