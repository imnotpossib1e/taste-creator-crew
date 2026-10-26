import './passwordChangeShowToggle.css';

// 비밀번호 표시 체크박스
function PasswordChangeShowToggle({ showPasswords, setShowPasswords }) {
  return (
    <div className="frame-10-8">
      <input
        id="show-passwords"
        type="checkbox"
        checked={showPasswords}
        onChange={(event) =>
          setShowPasswords(event.target.checked)
        }
        style={{ width: 18, height: 18, margin: 0 }}
      />
      <label className="layer--8" htmlFor="show-passwords">
        비밀번호 표시
      </label>
    </div>
  );
}
export default PasswordChangeShowToggle;
