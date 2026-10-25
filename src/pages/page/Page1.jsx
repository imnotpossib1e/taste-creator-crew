import './layer-.css';

export function Component() {
  return (
    <div className="layer-">
      <div className="content">
        <div className="header">
          <div className="location">
            <p className="layer--2">연남동</p>
            <div className="icon-chevron-down">
              <div className="vector"></div>
            </div>
          </div>
          <div className="search-button">
            <div className="icon-search">
              <div className="vector-2"></div>
              <div className="vector-3"></div>
            </div>
          </div>
        </div>
        <div className="type-tabs">
          <div className="texttab">
            <p className="label">음식점</p>
          </div>
          <div className="texttab-2">
            <p className="label-2">카페</p>
          </div>
        </div>
        <div className="categories">
          <div className="chip">
            <p className="label-3">전체</p>
          </div>
          <div className="chip-2">
            <p className="label-4">한식</p>
          </div>
          <div className="chip-3">
            <p className="label-5">중식</p>
          </div>
          <div className="chip-4">
            <p className="label-6">일식</p>
          </div>
          <div className="chip-5">
            <p className="label-7">양식</p>
          </div>
          <div className="chip-6">
            <p className="label-8">분식</p>
          </div>
        </div>
        <div className="weather">
          <div className="weather-box">
            <p className="layer-14">
              흐림 14° 오늘은 국물 요리를 찾는 사람이 많아요. 국밥, 칼국수 보기
            </p>
          </div>
        </div>
        <div className="nearby-section">
          <div className="section-header">
            <p className="layer--3">인기 순위</p>
            <p className="layer--4">지도로 보기</p>
          </div>
          <div className="listrow">
            <div className="info">
              <div className="frame-8">
                <div className="rectangle"></div>
                <p className="name">연남 국밥집</p>
              </div>
              <div className="meta">
                <p className="category">한식</p>
                <p className="detail">도보 5분</p>
              </div>
              <p className="sub">좋아요 312 리뷰 128</p>
            </div>
            <div className="trailing">
              <div className="icon-bookmark">
                <div className="vector-4"></div>
              </div>
            </div>
          </div>
          <div className="listrow-2">
            <div className="info-2">
              <div className="frame-8-2">
                <div className="rectangle-2"></div>
                <p className="name-2">라멘 키요</p>
              </div>
              <div className="meta-2">
                <p className="category-2">일식</p>
                <p className="detail-2">도보 4분</p>
              </div>
              <p className="sub-2">좋아요 165 리뷰 74</p>
            </div>
            <div className="trailing-2">
              <div className="icon-bookmark-2">
                <div className="vector-5"></div>
              </div>
            </div>
          </div>
          <div className="listrow-3">
            <div className="info-3">
              <div className="frame-8-3">
                <div className="rectangle-3"></div>
                <p className="name-3">홍반점</p>
              </div>
              <div className="meta-3">
                <p className="category-3">중식</p>
                <p className="detail-3">도보 7분</p>
              </div>
              <p className="sub-3">좋아요 143 리뷰 73</p>
            </div>
            <div className="trailing-3">
              <div className="icon-bookmark-3">
                <div className="vector-6"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="popular-section">
          <div className="section-header-2">
            <p className="layer--5">이번 주 좋아요 많은 곳</p>
            <p className="layer--6">전체</p>
          </div>
          <div className="popular-list">
            <div className="popular-item">
              <div className="rectangle-4"></div>
              <div className="title">
                <p className="layer-1">1</p>
                <p className="layer--7">연남 국밥집</p>
              </div>
              <p className="layer-312">좋아요 312</p>
            </div>
            <div className="popular-item-2">
              <div className="rectangle-5"></div>
              <div className="title-2">
                <p className="layer-2">2</p>
                <p className="layer--8">소소한 스시</p>
              </div>
              <p className="layer-287">좋아요 287</p>
            </div>
            <div className="popular-item-3">
              <div className="rectangle-6"></div>
              <div className="title-3">
                <p className="layer-3">3</p>
                <p className="layer--9">온기 카페</p>
              </div>
              <p className="layer-254">좋아요 254</p>
            </div>
            <div className="popular-item-4">
              <div className="rectangle-7"></div>
              <div className="title-4">
                <p className="layer-4">4</p>
                <p className="layer--10">파스타 공방</p>
              </div>
              <p className="layer-198">좋아요 198</p>
            </div>
          </div>
        </div>
      </div>
      <div className="tabbar">
        <div className="tab">
          <div className="icon-map">
            <div className="vector-7"></div>
            <div className="vector-8"></div>
          </div>
          <p className="layer--11">지도</p>
        </div>
        <div className="tab-2">
          <div className="icon-home">
            <div className="vector-9"></div>
          </div>
          <p className="layer--12">홈</p>
        </div>
        <div className="tab-3">
          <div className="icon-shuffle">
            <div className="vector-10"></div>
          </div>
          <p className="layer--13">랜덤</p>
        </div>
        <div className="tab-4">
          <div className="icon-bookmark-4">
            <div className="vector-11"></div>
          </div>
          <p className="layer--14">저장</p>
        </div>
      </div>
    </div>
  );
}
