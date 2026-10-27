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
