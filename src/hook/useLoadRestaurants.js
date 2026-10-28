import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setRestaurant } from '../redux/store';
import { getKakaoCafes, getKakaoRestaurants } from './kakaoApi';
import { getRestaurantStats } from './restaurant';

const SEOUL_CITY_HALL = { y: 37.566826, x: 126.9786567 };

// 앱이 열릴 때 내 주변 가게를 불러와 스토어에 담는다
// 어느 페이지에서 새로고침해도 스토어가 채워지도록 App에서 한 번만 호출
export function useLoadRestaurants() {
  const dispatch = useDispatch();

  useEffect(() => {
    // 위치가 빨리 바뀌는 경우 이전 응답이 최신 결과를 덮어쓰는 것 방지
    let ignore = false;

    const fetchList = async ({ x, y }) => {
      try {
        const [food, cafe] = await Promise.all([
          getKakaoRestaurants({ x, y }),
          getKakaoCafes({ x, y }),
        ]);

        const restaurants = await getRestaurantStats(
          [...food, ...cafe].map(item => {
            const [, group = '', desc = ''] = item.category_name.split(' > ');
            return {
              id: item.id,
              name: item.place_name,
              category: item.category_group_name, // 음식점 / 카페
              category_group: group, // 한식/중식/
              description: desc, // 커피전문점
              address: item.road_address_name,
              distance: item.distance,
              x: item.x,
              y: item.y,
            };
          }),
        );
        if (ignore) return;
        dispatch(setRestaurant(restaurants));
      } catch (err) {
        console.error(err);
      }
    };

    navigator.geolocation.getCurrentPosition(
      pos => fetchList({ y: pos.coords.latitude, x: pos.coords.longitude }),
      () => fetchList(SEOUL_CITY_HALL), // 실패 시 서울시청
    );

    return () => {
      ignore = true;
    };
  }, [dispatch]);
}
