// hook/kakaoApi.js
import axios from 'axios';

const kakao = axios.create({
  baseURL: 'https://dapi.kakao.com/v2/local',
  headers: { Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_API}` },
});

export async function getKakaoRestaurants({ x, y }) {
  const results = [];
  let page = 1;

  while (true) {
    const { data } = await kakao.get('/search/category.json', {
      params: {
        category_group_code: 'FD6', // 음식점 (카페는 CE7)
        x: x, // 경도
        y: y, // 위도
        radius: '500',
        size: '15',
        page,
        sort: 'distance',
      },
    });

    results.push(...data.documents);
    if (data.meta.is_end) break;
    page += 1;
  }

  return results;
}
export async function getKakaoCafes({ x, y }) {
  const results = [];
  let page = 1;

  while (true) {
    const { data } = await kakao.get('/search/category.json', {
      params: {
        category_group_code: 'CE7',
        x: x, // 경도
        y: y, // 위도
        radius: '500',
        size: '15',
        page,
        sort: 'distance',
      },
    });

    results.push(...data.documents);
    if (data.meta.is_end) break;
    page += 1;
  }

  return results;
}
export async function getKakaoSearchRes({ query, x, y }) {
  const results = [];
  let page = 1;

  while (true) {
    const { data } = await kakao.get('/search/keyword.json', {
      params: {
        query,
        category_group_code: 'FD6',
        x: x, // 경도
        y: y, // 위도
        radius: '500',
        size: '15',
        page,
        sort: 'distance',
      },
    });

    results.push(...data.documents);
    if (data.meta.is_end) break;
    page += 1;
  }

  return results;
}
export async function getKakaoSearchCafe({ query, x, y }) {
  const results = [];
  let page = 1;

  while (true) {
    const { data } = await kakao.get('/search/keyword.json', {
      params: {
        query,
        category_group_code: 'CE7',
        x: x, // 경도
        y: y, // 위도
        radius: '500',
        size: '15',
        page,
        sort: 'distance',
      },
    });

    results.push(...data.documents);
    if (data.meta.is_end) break;
    page += 1;
  }

  return results;
}

// 가게 이름으로 검색해 id가 같은 가게의 종류(한식/중식 …)를 찾는다 - 북마크처럼 DB에 종류가 없을 때용
export async function getKakaoCategoryGroup({ id, name }) {
  const { data } = await kakao.get('/search/keyword.json', {
    params: { query: name, size: '15' },
  });
  const place = data.documents.find(d => d.id === id);
  return place?.category_name.split(' > ')[1];
}
