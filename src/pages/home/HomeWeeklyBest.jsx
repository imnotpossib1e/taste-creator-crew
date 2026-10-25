import './homeWeeklyBest.css';

// 이번 주 좋아요 많은 곳 - API 연결 전까지 임시 데이터
const weeklyBestStores = [
  { id: 1, name: '연남 국밥집', category: '한식', weeklyLikes: 48 },
  { id: 2, name: '온기 카페', category: '카페', weeklyLikes: 41 },
  { id: 3, name: '소소한 스시', category: '일식', weeklyLikes: 37 },
  { id: 4, name: '파스타 공방', category: '양식', weeklyLikes: 29 },
  { id: 5, name: '떡볶이 연구소', category: '분식', weeklyLikes: 22 },
];

// 가로 스크롤 카드 하나
function WeeklyBestCard({ store }) {
  return (
    <li className="homeWeeklyBestCard">
      <div className="homeWeeklyBestThumb" />
      <strong>{store.name}</strong>
      <p>
        <span>{store.category}</span>
        <span>좋아요 {store.weeklyLikes}</span>
      </p>
    </li>
  );
}

function HomeWeeklyBest() {
  return (
    <section className="homeWeeklyBest">
      <div className="homeWeeklyBestHeader">
        <h2>이번 주 좋아요 많은 곳</h2>
        <button type="button">전체</button>
      </div>

      <ul>
        {weeklyBestStores.map(store => (
          <WeeklyBestCard key={store.id} store={store} />
        ))}
      </ul>
    </section>
  );
}

export default HomeWeeklyBest;
