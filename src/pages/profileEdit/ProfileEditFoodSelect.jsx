import './profileEditFoodSelect.css';
import { foodOptions } from './profileEditConstants';

// 좋아하는 음식 다중 선택
function ProfileEditFoodSelect({ selectedFoods, toggleFood }) {
  return (
    <div className="frame-8-4">
      <div className="frame-8-5">
        <p className="layer--3">좋아하는 음식 여러 개 선택</p>
        <p className="layer--4">
          랜덤 추천에서 이 종류를 더 자주 골라드려요.
        </p>
      </div>
      <div className="frame-8-6">
        {foodOptions.map(({ name, className }, index) => {
          const selected = selectedFoods.includes(name);
          return (
            <button
              key={name}
              type="button"
              className={className}
              style={{
                font: 'inherit',
                cursor: 'pointer',
                background: selected ? '#0f766e' : '#ffffff',
                border: `1px solid ${selected ? '#0f766e' : '#e5e7eb'}`,
              }}
              aria-pressed={selected}
              onClick={() => toggleFood(name)}
            >
              <span
                className={`layer--${5 + index}`}
                style={{ color: selected ? '#ffffff' : '#111827' }}
              >
                {name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
export default ProfileEditFoodSelect;
