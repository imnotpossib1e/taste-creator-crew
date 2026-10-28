import { useEffect, useState } from 'react';
import { getStorePhoto } from '../../hook/review.js';
import {
  EMPTY_RESULT_MESSAGE,
  WALK_METERS_PER_MINUTE,
} from './randomConstants';
import './randomResult.css';

const CATEGORY_IMG = {
  한식: 'korean.svg',
  중식: 'chinese.svg',
  일식: 'japanese.svg',
  양식: 'american.svg',
  카페: 'cafe.svg',
  분식: 'snack.svg',
  default: 'default.svg',
};

// 거리(m, 문자열) → 도보 시간(분), 1분 미만도 1분으로 올림
function toWalkMinutes(distance) {
  return Math.ceil(Number(distance) / WALK_METERS_PER_MINUTE);
}

// 추천 가게 사진 칸 - 리뷰 사진 중 가장 최근 1장, 없으면 '이미지 없음' 아이콘
// RandomResult에는 early return이 있어서 훅을 그 위에 둘 수 없어, 사진 칸을 따로 컴포넌트로 뺐다
// 꼭 RandomResult 밖에 둔다 - 안에서 만들면 다시 그릴 때마다 새 컴포넌트가 돼서 사진을 매번 다시 불러옴
// 사진이 없을 때 보여줄 종류 아이콘 때문에 categoryGroup도 props로 받는다
function RandomResultPhoto({ placeId, name, categoryGroup }) {
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    // '다른 곳 보기'를 빠르게 누르면 이전 가게 응답이 늦게 와서 덮어쓰지 않게
    let ignore = false;

    const fetchPhoto = async () => {
      try {
        const url = await getStorePhoto(placeId);
        if (!ignore) setPhoto(url);
      } catch (err) {
        // 못 불러와도 아이콘이 대신 보이니까 콘솔에만 남긴다
        console.error(err);
      }
    };
    fetchPhoto();

    return () => {
      ignore = true;
    };
  }, [placeId]);

  return (
    <div className="randomResultThumb">
      {photo ? (
        <img src={photo} alt={`${name} 사진`} />
      ) : (
        <img
          src={`/${CATEGORY_IMG[categoryGroup] ?? 'default.svg'}`}
          alt={categoryGroup}
          className="itemImg"
        />
      )}
    </div>
  );
}

function RandomResult({ onRetry, restaurant, onView }) {
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
      {/* key가 바뀌면 새로 만들어져서 이전 가게 사진이 잠깐 남지 않는다 */}
      <RandomResultPhoto
        key={restaurant.id}
        placeId={restaurant.id}
        name={restaurant.name}
        categoryGroup={restaurant.category_group}
      />
      <h2>{restaurant.name}</h2>
      <div className="randomResultMeta">
        {/* 설명(예: 국밥)은 카카오 분류 3번째 칸이라 없는 가게도 있어서 있을 때만 */}
        {restaurant.description && <span>{restaurant.description}</span>}
        <span>도보 {toWalkMinutes(restaurant.distance)}분</span>
        <div style={{ display: 'flex', gap: '4px' }}>
          <span style={{ color: '#F59E0B' }}>★</span>
          <span>{restaurant.rating_avg.toFixed(1)}</span>
        </div>
      </div>
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
