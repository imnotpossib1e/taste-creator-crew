import './layer-.css';

export function Component() {
  return (
    <div className="layer-">
      <div className="app-bar">
        <div className="close">
          <div className="icon-close">
            <div className="vector"></div>
          </div>
        </div>
        <p className="layer--2">연남 국밥집</p>
        <div className="spacer"></div>
      </div>
      <div className="content">
        <div className="hero-photo">
          <div className="image-1"></div>
          <div className="rectangle-11"></div>
          <div className="rectangle-12"></div>
          <div className="stats">
            <p className="layer-4-6">별점 4.6</p>
            <p className="layer-128">리뷰 128개</p>
          </div>
          <div className="reactions">
            <div className="reaction-312">
              <div className="icon-thumb-up">
                <div className="vector-2"></div>
              </div>
              <p className="layer--3">좋아요 312</p>
            </div>
          </div>
        </div>
        <div className="divider"></div>
        <div className="reviews">
          <div className="reviews-header">
            <p className="layer-128-2">리뷰 128</p>
            <p className="layer--4">리뷰 쓰기</p>
          </div>
          <div className="review">
            <div className="author">
              <p className="layer--5">국밥러버</p>
              <p className="layer-10-12">10월 12일</p>
            </div>
            <div className="stars">
              <div className="icon-star">
                <div className="vector-3"></div>
              </div>
              <div className="icon-star-2">
                <div className="vector-4"></div>
              </div>
              <div className="icon-star-3">
                <div className="vector-5"></div>
              </div>
              <div className="icon-star-4">
                <div className="vector-6"></div>
              </div>
              <div className="icon-star-5">
                <div className="vector-7"></div>
              </div>
            </div>
            <p className="layer-10">
              국물이 진한데 잡내가 없어요. 부추무침이랑 같이 먹으면 잘 어울려요.
              평일 점심에 10분 정도 기다렸습니다.
            </p>
            <div className="photos">
              <div className="rectangle"></div>
              <div className="rectangle-2"></div>
            </div>
          </div>
          <div className="review-2">
            <div className="author-2">
              <p className="layer--6">연남산책</p>
              <p className="layer-10-8">10월 8일</p>
            </div>
            <div className="stars-2">
              <div className="icon-star-6">
                <div className="vector-8"></div>
              </div>
              <div className="icon-star-7">
                <div className="vector-9"></div>
              </div>
              <div className="icon-star-8">
                <div className="vector-10"></div>
              </div>
              <div className="icon-star-9">
                <div className="vector-11"></div>
              </div>
              <div className="icon-star-10">
                <div className="vector-12"></div>
              </div>
            </div>
            <p className="layer--7">
              수육 국밥 양이 넉넉해요. 김치가 조금 짰지만 전체적으로 만족합니다.
            </p>
            <div className="photos-2">
              <div className="rectangle-3"></div>
              <div className="rectangle-4"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-bar">
        <div className="frame-8">
          <div className="save">
            <div className="icon-bookmark">
              <div className="vector-13"></div>
            </div>
          </div>
          <div className="button">
            <p className="label">리뷰 쓰기</p>
          </div>
        </div>
      </div>
    </div>
  );
}
