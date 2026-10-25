import './layer-.css';

export function Component() {
  return (
    <div className="layer-">
      <div className="content">
        <div className="header">
          <p className="layer--2">뭐 먹을지 고민될 때</p>
          <p className="layer--3">조건 안에서 한 곳을 골라드려요.</p>
        </div>
        <div className="kind">
          <p className="layer--4">종류</p>
          <div className="chips">
            <div className="chip">
              <p className="label">전체</p>
            </div>
            <div className="chip-2">
              <p className="label-2">한식</p>
            </div>
            <div className="chip-3">
              <p className="label-3">중식</p>
            </div>
            <div className="chip-4">
              <p className="label-4">일식</p>
            </div>
            <div className="chip-5">
              <p className="label-5">양식</p>
            </div>
            <div className="chip-6">
              <p className="label-6">분식</p>
            </div>
            <div className="chip-7">
              <p className="label-7">카페</p>
            </div>
          </div>
        </div>
        <div className="result">
          <p className="layer-1">1번째 추천</p>
          <div className="rectangle"></div>
          <p className="layer--5">연남 국밥집</p>
          <div className="meta">
            <p className="layer--6">돼지국밥</p>
            <p className="layer-5">도보 5분</p>
            <p className="layer-4-6">별점 4.6</p>
          </div>
          <div className="actions">
            <div className="button">
              <p className="label-8">다른 곳 보기</p>
            </div>
            <div className="button-2">
              <p className="label-9">가게 보기</p>
            </div>
          </div>
        </div>
      </div>
      <div className="tabbar">
        <div className="tab">
          <div className="icon-map">
            <div className="vector"></div>
            <div className="vector-2"></div>
          </div>
          <p className="layer--7">지도</p>
        </div>
        <div className="tab-2">
          <div className="icon-home">
            <div className="vector-3"></div>
          </div>
          <p className="layer--8">홈</p>
        </div>
        <div className="tab-3">
          <div className="icon-shuffle">
            <div className="vector-4"></div>
          </div>
          <p className="layer--9">랜덤</p>
        </div>
        <div className="tab-4">
          <div className="icon-bookmark">
            <div className="vector-5"></div>
          </div>
          <p className="layer--10">저장</p>
        </div>
      </div>
    </div>
  );
}
