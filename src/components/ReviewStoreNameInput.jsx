import TextInput from './TextInput';
import { storeCategories, storeNameErrorMessage } from './reviewConstants';
import './reviewStoreNameInput.css';

// 정보입력 - placeholder로 가게 이름 예시를 보여주고 사용자가 직접 입력
// TextInput이 id를 안 받아서 label로 감싸 연결, 칩까지 label에 넣으면 라벨 대상이 애매해져서 밖으로 뺌
function ReviewStoreNameInput({
  placeholder,
  storeName,
  onStoreNameChange,
  storeNameError,
  category,
  setCategory,
}) {
  return (
    // 에러면 error 클래스로 입력창 테두리를 빨갛게 (TextInput은 className을 못 받아서 부모에서 덮어씀)
    <div className={`reviewStoreNameInput ${storeNameError ? 'error' : ''}`}>
      <label>
        <span>정보입력</span>
        <TextInput
          type="text"
          placeholder={placeholder}
          value={storeName}
          onChange={e => onStoreNameChange(e.target.value)}
        />
      </label>

      {/* role="alert" - 문구가 나타나면 스크린리더가 바로 읽어줌 */}
      {storeNameError && (
        <p className="reviewStoreNameInputError" role="alert">
          {storeNameErrorMessage}
        </p>
      )}

      {/* 카테고리는 하나만 선택 - 좋았던 점(ReviewTags)과 달리 배열이 아니라 문자열 하나 */}
      <div className="reviewStoreNameInputChips">
        {storeCategories.map(item => {
          const isSelected = category === item;
          return (
            <button
              key={item}
              type="button"
              className={isSelected ? 'active' : ''}
              aria-pressed={isSelected}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ReviewStoreNameInput;
