import { useEffect } from 'react';
import './splash.css';

// 앱을 켤 때 잠깐 보이는 로고 화면 - 1.5초 뒤 onFinish로 App에 끝났다고 알린다
// 그동안 뒤에서는 지도·로그인 복원이 미리 진행된다
function Splash({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(onFinish, 1500);
    // 1.5초 전에 화면이 사라지면 타이머도 정리
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="splash" role="status" aria-label="먹을지도를 여는 중">
      <img className="splashLogo" src="/icon.svg" alt="" />
      <h1 className="splashTitle">먹을지도</h1>
      <p className="splashDesc">오늘 뭐 먹지? 지도에서 찾아요</p>
    </div>
  );
}

export default Splash;
