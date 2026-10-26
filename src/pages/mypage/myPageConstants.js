export const initialReviews = [
  {
    id: 1,
    restaurant: '연남 국밥집',
    text: '국물이 진한데 잡내가 없어요. 부추무침이랑 같이 먹으면 잘 어울려요.',
    date: '10월 12일',
  },
  {
    id: 2,
    restaurant: '성수 수육집',
    text: '수육이 부드럽고 양도 넉넉해요. 새우젓에 찍어 먹으니 더 맛있어요.',
    date: '10월 15일',
  },
  {
    id: 3,
    restaurant: '망원 칼국수',
    text: '점심시간에도 자리가 빨리 나는 편이에요. 반찬이 깔끔해서 좋아요.',
    date: '10월 18일',
  },
];

// 좋아요/북마크 목록은 API 연결 전까지 시안용 고정 데이터
export const likedPlaces = [
  {
    id: 1,
    name: '연남 국밥집',
    category: '한식',
    rating: 4.6,
    reviewCount: 128,
    likes: 312,
  },
  {
    id: 2,
    name: '성수 수육집',
    category: '한식',
    rating: 4.3,
    reviewCount: 87,
    likes: 194,
  },
  {
    id: 3,
    name: '망원 칼국수',
    category: '한식',
    rating: 4.8,
    reviewCount: 205,
    likes: 441,
  },
];

export const bookmarkedPlaces = [
  {
    id: 1,
    name: '소소한 스시',
    category: '일식',
    area: '연남동',
    memo: '26일 날 저녁약속'
  },
  {
    id: 2,
    name: '합정 파스타',
    category: '양식',
    area: '합정동',
    memo: '친구 생일에 가기',
  },
  {
    id: 3,
    name: '을지로 바',
    category: '주점',
    area: '을지로',
    memo: '퇴근 후 가볍게 한 잔',
  },
  {
    id: 4,
    name: '한남 베이커리',
    category: '디저트',
    area: '한남동',
    memo: '주말 아침에 방문하기',
  },
];

export const buttonStyle = {
  border: 0,
  background: 'transparent',
  padding: 0,
  cursor: 'pointer',
};
