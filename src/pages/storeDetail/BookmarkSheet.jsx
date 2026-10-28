import { useState } from 'react';
import './bookmarkSheet.css';

function BookmarkSheet({ restaurant, onClose, onSave }) {
  const [memo, setMemo] = useState('');
  const [nameMemo, setNameMemo] = useState('');

  const handleOverlayClick = e => {
    e.target === e.currentTarget && onClose();
  };

  const handleSaveClick = () => {
    onSave({
      memo,
    });
  };

  return (
    <div className="bookmarkSheetOverlay" onClick={handleOverlayClick}>
      <dialog className="bookmarkSheet" aria-modal="true">
        <h2>{restaurant.name}</h2>
        <input
          type="text"
          placeholder="음식점 이름"
          value={nameMemo}
          onChange={e => setNameMemo(e.target.value)}
        />
        <p>{restaurant.address}</p>
        <label htmlFor="memo">메모</label>
        <textarea
          id="memo"
          placeholder="맛, 양, 웨이팅은 어땠나요?"
          value={memo}
          onChange={e => setMemo(e.target.value)}
        />
        <button type="button" onClick={handleSaveClick}>
          북마크
        </button>
      </dialog>
    </div>
  );
}

export default BookmarkSheet;
