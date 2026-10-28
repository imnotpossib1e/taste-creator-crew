import {
  EMPTY_RESULT_MESSAGE,
  WALK_METERS_PER_MINUTE,
} from './randomConstants';
import './randomResult.css';

// 거리(m, 문자열) → 도보 시간(분), 1분 미만도 1분으로 올림
function toWalkMinutes(distance) {
  return Math.ceil(Number(distance) / WALK_METERS_PER_MINUTE);
}

function RandomResult({ count, onRetry, restaurant, onView }) {
  // 뽑힌 가게가 없으면 안내만 보여주고 끝 - 없을 때 restaurant.name에서 에러 나는 것 방지
  if (!restaurant) {
    return (
      <section className="randomResult">
        <p className="randomResultEmpty">{EMPTY_RESULT_MESSAGE}</p>
      </section>
    );
  }

  return (
    <section className="randomResult">
      <p className="randomResultCount">{count}번째 추천</p>
      {/* 이미지 자리 <img> 로 교체 예정*/}
      <div className="randomResultThumb" />
      <h2>{restaurant.name}</h2>
      <p className="randomResultMeta">
        {/* <span>{restaurant.description}</span> */}
        {restaurant.descroption && <span>{restaurant.descroption}</span>}
        <span>도보 {toWalkMinutes(restaurant.distance)}분</span>
      </p>
      <div className="randomResultActions">
        <button type="button" className="randomResultRetry" onClick={onRetry}>
          다른 곳 보기
        </button>
        <button type="button" className="randomResultView" onClick={onView}>
          가게 보기
        </button>
      </div>
    </section>
  );
}

export default RandomResult;
