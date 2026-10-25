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
        <p className="layer--2">리뷰 쓰기</p>
        <div className="spacer"></div>
      </div>
      <div className="content">
        <div className="place">
          <div className="rectangle"></div>
          <div className="place-info">
            <p className="layer--3">연남 국밥집</p>
            <p className="layer--4">한식</p>
          </div>
        </div>
        <div className="rating">
          <p className="layer--5">별점</p>
          <div className="rating-row">
            <div className="stars">
              <div className="star-1">
                <div className="icon-star">
                  <div className="vector-2"></div>
                </div>
              </div>
              <div className="star-2">
                <div className="icon-star-2">
                  <div className="vector-3"></div>
                </div>
              </div>
              <div className="star-3">
                <div className="icon-star-3">
                  <div className="vector-4"></div>
                </div>
              </div>
              <div className="star-4">
                <div className="icon-star-4">
                  <div className="vector-5"></div>
                </div>
              </div>
              <div className="star-5">
                <div className="icon-star-5">
                  <div className="vector-6"></div>
                </div>
              </div>
            </div>
            <p className="layer--6">맛있어요</p>
          </div>
        </div>
        <div className="good-points">
          <p className="layer--7">좋았던 점 선택</p>
          <div className="chips">
            <div className="chip">
              <p className="label">음식이 맛있어요</p>
            </div>
            <div className="chip-2">
              <p className="label-2">양이 많아요</p>
            </div>
            <div className="chip-3">
              <p className="label-3">가격이 괜찮아요</p>
            </div>
            <div className="chip-4">
              <p className="label-4">친절해요</p>
            </div>
            <div className="chip-5">
              <p className="label-5">혼밥하기 좋아요</p>
            </div>
            <div className="chip-6">
              <p className="label-6">대화하기 좋아요</p>
            </div>
          </div>
        </div>
        <div className="photos">
          <p className="layer-5">사진 최대 5장</p>
          <div className="photo-row">
            <div className="add-photo">
              <div className="icon-camera">
                <div className="vector-7"></div>
                <div className="vector-8"></div>
              </div>
              <p className="layer-2-5">2/5</p>
            </div>
            <div className="photo-1">
              <div className="remove">
                <div className="icon-close-2">
                  <div className="vector-9"></div>
                </div>
              </div>
            </div>
            <div className="photo-2">
              <div className="remove-2">
                <div className="icon-close-3">
                  <div className="vector-10"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text">
          <p className="layer--8">내용</p>
          <div className="textarea">
            <p className="layer--9">맛, 양, 웨이팅은 어땠나요?</p>
          </div>
          <div className="counter">
            <p className="layer-0-500">0/500</p>
          </div>
        </div>
      </div>
      <div className="bottom-bar">
        <div className="button">
          <p className="label-7">등록하기</p>
        </div>
      </div>
    </div>
  );
}
