import './reviewSubmit.css';

function ReviewSubmit({ label }) {
  return (
    <div className="reviewSubmit">
      <button type="submit">{label}</button>
    </div>
  );
}

export default ReviewSubmit;
