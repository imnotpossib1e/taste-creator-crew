import { useState } from 'react';
import ReviewHeader from './ReviewHeader';
import ReviewStore from './ReviewStore';
import ReviewRating from './ReviewRating';
import ReviewTags from './ReviewTags';
import ReviewPhotos from './ReviewPhotos';
import ReviewContent from './ReviewContent';
import ReviewSubmit from './ReviewSubmit';
import './reviewForm.css';

// 배열에 있으면 빼고, 없으면 추가한 새 배열을 반환
function toggleItem(list, item) {
  return list.includes(item)
    ? list.filter(value => value !== item)
    : [...list, item];
}

function ReviewForm({ title, submitLabel }) {
  // 등록할 때 한꺼번에 모아야 해서 폼에서 관리
  const [rating, setRating] = useState(0);
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState('');

  const handleToggleTag = tag => {
    setTags(prev => toggleItem(prev, tag));
  };

  return (
    <div className="reviewForm">
      <ReviewHeader title={title} />

      <main className="reviewFormContent">
        <ReviewStore />
        <ReviewRating rating={rating} setRating={setRating} />
        <ReviewTags tags={tags} onToggleTag={handleToggleTag} />
        <ReviewPhotos />
        <ReviewContent content={content} setContent={setContent} />
      </main>

      <ReviewSubmit label={submitLabel} />
    </div>
  );
}

export default ReviewForm;
