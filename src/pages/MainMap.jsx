import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRestaurant, reset } from '../redux/store';
import './MainMap.css';
import { ChefHat, CookingPot, Soup, Utensils } from 'lucide-react';
import { getKakaoRestaurants } from '../hook/kakaoApi';

const CATEGORY_MAP = {
  한식: <CookingPot />,
  중식: <Soup />,
  일식: <ChefHat />,
  양식: <Utensils />,
};

export default function MainMap() {
  const mapRef = useRef(null);
  const markers = useRef([]);
  const mapInstance = useRef(null);
  const [position, setPosition] = useState({});
  const [res, setRes] = useState([]);
  const selectedMarker = useRef(null);

  const dispatch = useDispatch();

  // 내 위치 불러오기
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      pos => setPosition({ y: pos.coords.latitude, x: pos.coords.longitude }),
      () => setPosition({ y: 37.566826, x: 126.9786567 }), // 실패 시 서울시청
    );
  }, []);

  // 지도 생성
  useEffect(() => {
    const { naver } = window;

    mapInstance.current = new naver.maps.Map(mapRef.current, {
      center: new naver.maps.LatLng(position.y, position.x),
      zoom: 17,
    });
  }, []);

  // 위치 바뀌면 중심 이동
  useEffect(() => {
    const { naver } = window;
    if (!naver || !mapInstance.current) return;
    mapInstance.current.setCenter(
      new naver.maps.LatLng(position.y, position.x),
    );
  }, [position]);

  // 상점 리스트 불러오기
  useEffect(() => {
    if (!position) return;
    // 위치가 빨리 바뀌는 경우 이전 응답이 최신 결과를 덮어쓰는 것 방지
    let ignore = false;

    const fetchList = async () => {
      try {
        const items = await getKakaoRestaurants({
          x: position.x,
          y: position.y,
        });
        // 응답 결과 저장
        if (ignore) return;

        setRes(items);
        dispatch(reset());

        items.forEach(item =>
          dispatch(
            addRestaurant({
              id: item.id,
              name: item.place_name,
              description: item.category_name.split(' > ')[1],
              category: item.category_group_name,
              address: item.road_address_name,
              distance: item.distance,
              x: item.x,
              y: item.y,
            }),
          ),
        );
        items.forEach(item => console.log(item));
      } catch (err) {
        console.error(err);
      }
    };
    fetchList();

    return () => {
      ignore = true;
    };
  }, [position, dispatch]);

  // 마크 그리기
  useEffect(() => {
    const { naver } = window;
    if (!naver || !mapInstance.current) return;

    // 이전 마커 제거
    markers.current.forEach(m => m.setMap(null));
    selectedMarker.current = null;

    markers.current = res.map(item => {
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(item.y, item.x),
        map: mapInstance.current,
        zIndex: 100,
        icon: {
          content: `
              <div id="${item.id}" class="map-marker-wrap">
                <div class="map-marker">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-utensils preview-icon"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>
                  ${item.place_name}
                </div>
              </div>`,
          anchor: new naver.maps.Point(0, 0),
        },
      });
      naver.maps.Event.addListener(marker, 'click', () => {
        if (selectedMarker.current && selectedMarker.current !== marker) {
          selectedMarker.current.setZIndex(100);
        }
        marker.setZIndex(1000);
        selectedMarker.current = marker;
        mapInstance.current.setCenter(marker.getPosition());
      });

      return marker;
    });
  }, [res]);

  return (
    <>
      {/* <h1>지도</h1> */}
      <div ref={mapRef} style={{ width: '100%', height: '400px' }}></div>
    </>
  );
}
