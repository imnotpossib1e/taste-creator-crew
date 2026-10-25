import './layer-.css';

export function Component() {
  return (
    <div className="layer-">
      <div className="app-bar">
        <div className="back">
          <div className="icon-chevron-left">
            <div className="vector"></div>
          </div>
        </div>
        <p className="layer--2">인기 순위</p>
      </div>
      <div className="content">
        <div className="sort-row">
          <p className="layer-10-13-19">10월 13일부터 19일까지</p>
          <div className="sort">
            <p className="layer--3">좋아요 순</p>
            <div className="icon-chevron-down">
              <div className="vector-2"></div>
            </div>
          </div>
        </div>
        <div className="rankrow">
          <p className="rank">1</p>
          <div className="info">
            <div className="frame-8">
              <div className="rectangle"></div>
              <p className="name">연남 국밥집</p>
            </div>
            <div className="meta">
              <p className="category">한식</p>
              <p className="detail">별점 4.6 리뷰 128</p>
            </div>
          </div>
          <div className="likes">
            <div className="vector-3"></div>
            <p className="count">312</p>
          </div>
        </div>
        <div className="rankrow-2">
          <p className="rank-2">2</p>
          <div className="info-2">
            <div className="frame-8-2">
              <div className="rectangle-2"></div>
              <p className="name-2">소소한 스시</p>
            </div>
            <div className="meta-2">
              <p className="category-2">일식</p>
              <p className="detail-2">별점 4.7 리뷰 96</p>
            </div>
          </div>
          <div className="likes-2">
            <div className="vector-4"></div>
            <p className="count-2">287</p>
          </div>
        </div>
        <div className="rankrow-3">
          <p className="rank-3">3</p>
          <div className="info-3">
            <div className="frame-8-3">
              <div className="rectangle-3"></div>
              <p className="name-3">온기 카페</p>
            </div>
            <div className="meta-3">
              <p className="category-3">카페</p>
              <p className="detail-3">별점 4.6 리뷰 211</p>
            </div>
          </div>
          <div className="likes-3">
            <div className="vector-5"></div>
            <p className="count-3">254</p>
          </div>
        </div>
        <div className="rankrow-4">
          <p className="rank-4">4</p>
          <div className="info-4">
            <div className="frame-8-4">
              <div className="rectangle-4"></div>
              <p className="name-4">파스타 공방</p>
            </div>
            <div className="meta-4">
              <p className="category-4">양식</p>
              <p className="detail-4">별점 4.5 리뷰 84</p>
            </div>
          </div>
          <div className="likes-4">
            <div className="vector-6"></div>
            <p className="count-4">198</p>
          </div>
        </div>
        <div className="rankrow-5">
          <p className="rank-5">5</p>
          <div className="info-5">
            <div className="frame-8-5">
              <div className="rectangle-5"></div>
              <p className="name-5">할매 손칼국수</p>
            </div>
            <div className="meta-5">
              <p className="category-5">한식</p>
              <p className="detail-5">별점 4.4 리뷰 150</p>
            </div>
          </div>
          <div className="likes-5">
            <div className="vector-7"></div>
            <p className="count-5">176</p>
          </div>
        </div>
        <div className="rankrow-6">
          <p className="rank-6">6</p>
          <div className="info-6">
            <div className="frame-8-6">
              <div className="rectangle-6"></div>
              <p className="name-6">홍반점</p>
            </div>
            <div className="meta-6">
              <p className="category-6">중식</p>
              <p className="detail-6">별점 4.5 리뷰 73</p>
            </div>
          </div>
          <div className="likes-6">
            <div className="vector-8"></div>
            <p className="count-6">143</p>
          </div>
        </div>
        <div className="rankrow-7">
          <p className="rank-7">7</p>
          <div className="info-7">
            <div className="frame-8-7">
              <div className="rectangle-7"></div>
              <p className="name-7">라멘 키요</p>
            </div>
            <div className="meta-7">
              <p className="category-7">일식</p>
              <p className="detail-7">별점 4.4 리뷰 74</p>
            </div>
          </div>
          <div className="likes-7">
            <div className="vector-9"></div>
            <p className="count-7">131</p>
          </div>
        </div>
        <div className="rankrow-8">
          <p className="rank-8">8</p>
          <div className="info-8">
            <div className="frame-8-8">
              <div className="rectangle-8"></div>
              <p className="name-8">떡볶이 연구소</p>
            </div>
            <div className="meta-8">
              <p className="category-8">분식</p>
              <p className="detail-8">별점 4.3 리뷰 61</p>
            </div>
          </div>
          <div className="likes-8">
            <div className="vector-10"></div>
            <p className="count-8">120</p>
          </div>
        </div>
      </div>
      <div className="tabbar">
        <div className="tab">
          <div className="icon-map">
            <div className="vector-11"></div>
            <div className="vector-12"></div>
          </div>
          <p className="layer--4">지도</p>
        </div>
        <div className="tab-2">
          <div className="icon-home">
            <div className="vector-13"></div>
          </div>
          <p className="layer--5">홈</p>
        </div>
        <div className="tab-3">
          <div className="icon-shuffle">
            <div className="vector-14"></div>
          </div>
          <p className="layer--6">랜덤</p>
        </div>
        <div className="tab-4">
          <div className="icon-bookmark">
            <div className="vector-15"></div>
          </div>
          <p className="layer--7">저장</p>
        </div>
      </div>
    </div>
  );
}
