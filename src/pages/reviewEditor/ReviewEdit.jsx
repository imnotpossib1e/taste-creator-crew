import ReviewForm from '../../components/ReviewForm.jsx';

function ReviewEdit() {
  // 기존 리뷰 수정 - 저장 로직 연결 전까지 콘솔 확인만
  const handleSubmit = review => {
    console.log('리뷰 수정:', review);
  };

  return (
    <ReviewForm
      title="리뷰 수정"
      submitLabel="수정하기"
      onSubmit={handleSubmit}
    />
  );
}

export default ReviewEdit;
