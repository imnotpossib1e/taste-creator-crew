import { useState } from 'react';
import ReviewHeader from './ReviewHeader';
import ReviewStore from './ReviewStore';
import ReviewRating from './ReviewRating';
import ReviewTags from './ReviewTags';
import ReviewPhotos from './ReviewPhotos';
import ReviewContent from './ReviewContent';
import ReviewSubmit from './ReviewSubmit';
import './reviewForm.css';
import ReviewStoreNameInput from './ReviewStoreNameInput';
import { MIN_RATING } from './reviewConstants';

// 배열에 있으면 빼고, 없으면 추가한 새 배열을 반환
function toggleItem(list, item) {
  return list.includes(item)
    ? list.filter(value => value !== item)
    : [...list, item];
}

// DB에 JSON 글자('["https://...", ...]')로 저장한 image_url을 사진 배열로 - 비어 있으면 []
// 이미 올라간 사진이라 file은 없고 주소만 있다
function toPhotos(imageUrl) {
  return imageUrl ? JSON.parse(imageUrl).map(url => ({ url })) : [];
}

// DB에 'a,b'처럼 콤마로 이어 저장한 good_points를 태그 배열로 - 비어 있으면 []
function toTags(goodPoints) {
  return goodPoints ? goodPoints.split(',') : [];
}

// initialReview: 수정할 때 DB에서 불러온 기존 리뷰 (쓰기에서는 안 넘겨서 빈 값으로 시작)
function ReviewForm({
  title,
  submitLabel,
  onSubmit,
  restaurant,
  isSaving,
  initialReview,
}) {
  // 등록할 때 한꺼번에 모아야 해서 폼에서 관리
  const [rating, setRating] = useState(initialReview?.rating ?? 0);
  const [tags, setTags] = useState(toTags(initialReview?.good_points));
  const [content, setContent] = useState(initialReview?.content ?? '');
  const [storeName, setStoreName] = useState(initialReview?.place_name ?? '');
  const [category, setCategory] = useState(restaurant.category_group);
  // 사진 - 새로 고른 건 { file, url(미리보기 임시 주소) }, 수정할 때 기존 사진은 { url }만
  const [photos, setPhotos] = useState(toPhotos(initialReview?.image_url));
  const [storeNameError, setStoreNameError] = useState(false);
  const [ratingError, setRatingError] = useState(false);

  const handleToggleTag = tag => {
    setTags(prev => toggleItem(prev, tag));
  };

  // 이름을 입력하기 시작하면 안내 문구를 지운다
  const handleStoreNameChange = value => {
    setStoreName(value);
    setStoreNameError(false);
  };

  // 별을 고르면 안내 문구를 지운다
  const handleRatingChange = value => {
    setRating(value);
    setRatingError(false);
  };

  // 등록 버튼(type="submit")이나 입력창 Enter로 제출
  // 폼은 검사하고 값을 모으기만 하고, 추가할지 수정할지는 페이지(onSubmit)가 정한다
  const handleSubmit = e => {
    e.preventDefault(); // 브라우저 기본 동작(새로고침)을 막아야 입력값이 안 날아감

    // 이름·별점을 각각 검사해서 비어 있는 안내를 한 번에 모두 보여준다
    const isNameEmpty = storeName.trim() === '';
    const isRatingEmpty = rating < MIN_RATING;

    if (isNameEmpty) {
      setStoreNameError(true);
    }
    if (isRatingEmpty) {
      setRatingError(true);
    }
    if (isNameEmpty || isRatingEmpty) {
      return;
    }

    const review = {
      storeId: restaurant.id,
      storeName,
      category,
      rating,
      tags,
      content,
      // 새 사진은 업로드할 파일, 기존 사진은 이미 올라간 주소를 넘긴다
      photos: photos.map(photo => photo.file ?? photo.url),
    };
    onSubmit(review);
  };

  return (
    <form className="reviewForm" onSubmit={handleSubmit}>
      <ReviewHeader title={title} />

      <main className="reviewFormContent">
        <ReviewStore restaurant={restaurant} />
        <ReviewStoreNameInput
          placeholder={restaurant.name}
          storeName={storeName}
          onStoreNameChange={handleStoreNameChange}
          storeNameError={storeNameError}
          category={category}
          setCategory={setCategory}
        />
        <ReviewRating
          rating={rating}
          setRating={handleRatingChange}
          ratingError={ratingError}
        />
        <ReviewTags tags={tags} onToggleTag={handleToggleTag} />
        <ReviewPhotos photos={photos} setPhotos={setPhotos} />
        <ReviewContent content={content} setContent={setContent} />
      </main>

      <ReviewSubmit label={submitLabel} disabled={isSaving} />
    </form>
  );
}

export default ReviewForm;
