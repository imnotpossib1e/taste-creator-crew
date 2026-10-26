import ReviewForm from '../../components/ReviewForm.jsx';

function ReviewWrite() {
  // 새 리뷰 추가 - 저장 로직 연결 전까지 콘솔 확인만
  const handleSubmit = review => {
    console.log('리뷰 등록:', review);
  };

  return (
    <ReviewForm
      title="리뷰 쓰기"
      submitLabel="등록하기"
      onSubmit={handleSubmit}
    />
  );
}

export default ReviewWrite;
