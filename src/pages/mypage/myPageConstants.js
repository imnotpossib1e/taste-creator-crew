export const initialReviews = [
  {
    id: 1,
    restaurant: '연남 국밥집',
    text: '국물이 진한데 잡내가 없어요. 부추무침이랑 같이 먹으면 잘 어울려요.',
    date: '10월 12일',
  },
  {
    id: 2,
    restaurant: '연남 국밥집',
    text: '국물이 진한데 잡내가 없어요. 부추무침이랑 같이 먹으면 잘 어울려요.',
    date: '10월 12일',
  },
  {
    id: 3,
    restaurant: '연남 국밥집',
    text: '국물이 진한데 잡내가 없어요. 부추무침이랑 같이 먹으면 잘 어울려요.',
    date: '10월 12일',
  },
];

// 좋아요/북마크 목록은 API 연결 전까지 시안용 고정 데이터
export const likedPlaces = [1, 2, 3, 4].map((id) => ({
  id,
  name: '연남 국밥집',
  category: '한식',
  rating: 4.6,
  reviewCount: 128,
  likes: 312,
}));

export const bookmarkedPlaces = [
  { id: 1, name: '소소한 스시', category: '일식', area: '연남동' },
  ...[2, 3, 4].map((id) => ({
    id,
    name: '소소한 스시',
    category: '일식',
    area: '연남동',
    memo: '친구 생일에 가기',
  })),
];

export const buttonStyle = {
  border: 0,
  background: 'transparent',
  padding: 0,
  cursor: 'pointer',
};
