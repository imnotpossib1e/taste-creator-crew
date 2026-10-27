import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../redux/authSlice';
import { supabase } from '../../utils/superbase';
import LoginTitle from './LoginTitle';
import LoginFields from './LoginFields';
import LoginSocial from './LoginSocial';
import './login.css';

// 로그인 페이지 - 섹션 컴포넌트를 순서대로 조립
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!email.trim() || !password) {
      setFeedback('이메일과 비밀번호를 입력해 주세요.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFeedback('올바른 이메일 주소를 입력해 주세요.');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });
      if (error) {
        // 이메일 없음 / 비밀번호 틀림을 구분하지 않는다
        setFeedback('이메일 또는 비밀번호가 올바르지 않습니다.');
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('id, nickname, category, profile_image')
        .eq('auth_id', data.user.id)
        .single();
      if (profileError) {
        setFeedback('회원 정보를 불러오지 못했습니다.');
        return;
      }

      dispatch(
        setCredentials({
          id: profile.id,
          email: data.user.email,
          nickname: profile.nickname,
          foods: profile.category,
          profileImage: profile.profile_image,
        }),
      );
      navigate('/mypage');
    } catch (err) {
      setFeedback(err.message || '로그인 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordRecovery = () => {
    setFeedback(
      email.trim()
        ? '비밀번호 재설정 서버가 연결되지 않았습니다.'
        : '비밀번호를 재설정하려면 이메일을 먼저 입력해 주세요.',
    );
  };

  return (
    <div className="layer-2 page6">
      <button
        type="button"
        className="login-back"
        aria-label="뒤로가기"
        onClick={() => navigate('/')}
      >
        <span className="login-back-icon"></span>
      </button>
      <div className="frame-10">
        <LoginTitle />
        <form className="frame-10-3" onSubmit={handleLogin}>
          <LoginFields
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
          <button
            className="component-2"
            type="submit"
            disabled={loading}
            style={loading ? { opacity: 0.7, cursor: 'not-allowed' } : undefined}
          >
            <p className="layer--6">{loading ? '로그인 중...' : '로그인'}</p>
          </button>
          <button
            type="button"
            className="layer--7"
            onClick={handlePasswordRecovery}
          >
            비밀번호를 잊으셨나요?
          </button>
          <LoginSocial />
          <p className="layer--7" role="status" aria-live="polite">
            {feedback}
          </p>
        </form>
      </div>
    </div>
  );
}
export default Login;
