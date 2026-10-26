import './loginTitle.css';

// 로그인 제목/안내 문구
function LoginTitle() {
  return (
    <div className="frame-10-2">
      <p className="layer-">로그인</p>
      <div className="frame-8">
        <p className="layer--2">저장한 가게와 내 리뷰를 어느 기기에서든</p>
        <p className="layer--3">볼 수 있어요.</p>
      </div>
    </div>
  );
}
export default LoginTitle;
