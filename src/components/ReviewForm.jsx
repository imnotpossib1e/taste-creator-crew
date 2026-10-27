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

function ReviewForm({ title, submitLabel, onSubmit, restaurant, isSaving }) {
  // 등록할 때 한꺼번에 모아야 해서 폼에서 관리
  const [rating, setRating] = useState(0);
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState('');
  const [storeName, setStoreName] = useState('');
  const [category, setCategory] = useState(restaurant.description);
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
        <ReviewPhotos />
        <ReviewContent content={content} setContent={setContent} />
      </main>

      <ReviewSubmit label={submitLabel} disabled={isSaving} />
    </form>
  );
}

export default ReviewForm;
