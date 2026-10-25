import './randomResult.css';

function RandomResult() {
  return (
    <section className="randomResult">
      <p className="randomResultCount">1번째 추천</p>
      {/* 이미지 자리 <img> 로 교체 예정*/}
      <div className="randomResultThumb" />
      <h2>연남 국밥집</h2>
      <p className="randomResultMeta">
        <span>돼지국밥</span>
        <span>도보 5분</span>
        <span>별점 4.6</span>
      </p>
      <div className="randomResultActions">
        <button type="button" className="randomResultRetry">
          다른 곳 보기
        </button>
        <button type="button" className="randomResultView">
          가게 보기
        </button>
      </div>
    </section>
  );
}

export default RandomResult;
