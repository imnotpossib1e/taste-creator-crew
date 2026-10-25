import './homeWeatherBanner.css';

// 날씨 추천 배너 - 날씨 API 연결 전까지 임시 데이터
const weather = {
  condition: '흐림',
  temperature: 14,
  message: '오늘은 국물 요리를 찾는 사람이 많아요.',
  recommend: '국밥, 칼국수 보기',
};

function HomeWeatherBanner() {
  return (
    <section className="homeWeatherBanner">
      <p>
        <strong>
          {weather.condition} {weather.temperature}°
        </strong>{' '}
        {weather.message}{' '}
        <button type="button">{weather.recommend}</button>
      </p>
    </section>
  );
}

export default HomeWeatherBanner;
