import './signupEmailField.css';
import { inputStyle } from './signupConstants';

// 이메일 입력
function SignupEmailField({ email, setEmail }) {
  return (
    <div className="frame-10-2">
      <label className="layer--2" htmlFor="signup-email">
        이메일
      </label>
      <div className="frame-12">
        <input
          id="signup-email"
          className="yeonnam-example-com"
          type="email"
          autoComplete="email"
          placeholder="name@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          style={inputStyle}
        />
      </div>
    </div>
  );
}
export default SignupEmailField;
