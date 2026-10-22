import { Eye, EyeOff } from 'lucide-react';
import TextInput from './TextInput';
import { useState } from 'react';
import './passwordinput.css';

//비밀번호 입력창
function PasswordInput({ placeholder, value, onChange, onKeyDown }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="passwordInput">
      <TextInput
        type={isVisible === true ? 'text' : 'password'}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <button
        type="button"
        onClick={() => {
          setIsVisible(!isVisible);
        }}
      >
        {isVisible === true ? (
          <EyeOff color={'#b0abab'} size={20} />
        ) : (
          <Eye color={'#b0abab'} size={20} />
        )}
      </button>
    </div>
  );
}

export default PasswordInput;
