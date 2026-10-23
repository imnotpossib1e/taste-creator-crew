import './textinput.css';

// 일반입력창
function TextInput({ type, placeholder, value, onChange, onKeyDown }) {
  return (
    <input
      className="textInput"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
}

export default TextInput;
