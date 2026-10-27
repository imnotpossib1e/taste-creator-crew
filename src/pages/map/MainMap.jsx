import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  reset,
  resetSearch,
  selectVisibleRestaurants,
  setRestaurant,
  setSearchRestaurant,
} from '../../redux/store';
import './mainMap.css';
import { ChefHat, CookingPot, Soup, Utensils } from 'lucide-react';
import {
  getKakaoCafes,
  getKakaoRestaurants,
  getKakaoSearchCafe,
  getKakaoSearchRes,
} from '../../hook/kakaoApi';
import RestaurantList from './RestaurantList';
import SearchInput from '../../components/SearchInput';
import CategoryButton from './categoryButton';

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
  const [position, setPosition] = useState(null);
  // MainMap.jsx
  const res = useSelector(selectVisibleRestaurants);
  const isSearching = useSelector(state => state.searchRestaurant !== null);
  const selectedMarker = useRef(null);
  const [search, setSearch] = useState('');
  const contentRef = useRef();
  // const [selectedGroup, setSelectedGroup] = useState(null);

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
    if (!naver || !position || mapInstance.current) return;

    mapInstance.current = new naver.maps.Map(mapRef.current, {
      center: new naver.maps.LatLng(position.y, position.x),
      zoom: 18,
      logoControlOptions: {
        position: naver.maps.Position.TOP_LEFT,
      },
      zoomControl: false,
      mapDataControl: false,
    });
  }, [position]);

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
        const [food, cafe] = await Promise.all([
          getKakaoRestaurants({ x: position.x, y: position.y }),
          getKakaoCafes({ x: position.x, y: position.y }),
        ]);
        // 응답 결과 저장
        if (ignore) return;

        const restaurants = [...food, ...cafe].map(item => {
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
        });

        // restaurants.forEach(item => console.log(item));

        dispatch(setRestaurant(restaurants));
      } catch (err) {
        console.error(err);
      }
    };
    fetchList();

    return () => {
      ignore = true;
    };
  }, [position, dispatch]);

  // 마크 그리기 (카카오맵 방식: 겹치는 이름표는 숨기고 점으로)
  useEffect(() => {
    const { naver } = window;
    const map = mapInstance.current;
    if (!naver || !map) return;

    // 이전 마커 제거
    markers.current.forEach(m => m.setMap(null));
    selectedMarker.current = null;

    const PIN = 20; // 핀 크기(px)
    const DOT = 8; // 점 크기(px)

    const dotIcon = {
      content: '<div class="map-dot"></div>',
      anchor: new naver.maps.Point(DOT / 2, DOT / 2),
    };

    const labelIcon = (place, selected) => ({
      content: `
        <div class="kmarker ${selected ? 'is-selected' : ''}">
          <span class="kmarker-pin">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>
          </span>
          <span class="kmarker-label">${place.name}</span>
        </div>`,
      anchor: new naver.maps.Point(PIN / 2, PIN / 2), // 핀 중앙이 좌표에 오게
    });

    // 이름표 너비 계산용 (CSS 폰트와 맞춤)
    const ctx = document.createElement('canvas').getContext('2d');
    ctx.font = '600 12px sans-serif';

    // 우선순위: 가까운 순 (나중에 평점/리뷰 순으로 바꿔도 됨)
    const items = [...res]
      .sort((a, b) => Number(a.distance) - Number(b.distance))
      .map(place => {
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(place.y, place.x),
          map,
          icon: dotIcon,
          zIndex: 100,
        });
        const item = {
          place,
          marker,
          width: PIN + 4 + ctx.measureText(place.name).width + 6,
          state: 'dot', // 'dot' | 'label' | 'selected'
        };

        // 클릭하면 선택 → 무조건 이름표로 보이게
        naver.maps.Event.addListener(marker, 'click', () => {
          selectedMarker.current = marker;
          map.panTo(marker.getPosition()); // 이동 끝나면 idle에서 layout 실행
          layout();
        });

        return item;
      });

    markers.current = items.map(i => i.marker);

    // 겹침 계산해서 이름표/점 결정
    function layout() {
      const proj = map.getProjection();
      const placed = [];

      // 선택된 마커를 맨 앞으로 (항상 이름표 보장), 나머지는 우선순위 순서 유지
      const ordered = [...items].sort(
        (a, b) =>
          (b.marker === selectedMarker.current) -
          (a.marker === selectedMarker.current),
      );

      ordered.forEach(item => {
        const p = proj.fromCoordToOffset(item.marker.getPosition());
        const box = {
          left: p.x - PIN / 2,
          top: p.y - PIN / 2,
          right: p.x - PIN / 2 + item.width,
          bottom: p.y + PIN / 2,
        };
        const isSelected = item.marker === selectedMarker.current;
        const hit = placed.some(
          b =>
            !(
              box.right < b.left ||
              box.left > b.right ||
              box.bottom < b.top ||
              box.top > b.bottom
            ),
        );

        const next = isSelected ? 'selected' : hit ? 'dot' : 'label';
        if (next !== 'dot') placed.push(box);

        if (next !== item.state) {
          item.marker.setIcon(
            next === 'dot'
              ? dotIcon
              : labelIcon(item.place, next === 'selected'),
          );
          item.marker.setZIndex(
            next === 'selected' ? 1000 : next === 'label' ? 200 : 100,
          );
          item.state = next;
        }
      });
    }

    layout();
    const idleListener = naver.maps.Event.addListener(map, 'idle', layout);

    return () => {
      naver.maps.Event.removeListener(idleListener);
    };
  }, [res]);

  const searchRes = () => {
    if (search === '') {
      contentRef.current.focus();
      return;
    }
    if (!position) return;
    // 위치가 빨리 바뀌는 경우 이전 응답이 최신 결과를 덮어쓰는 것 방지
    let ignore = false;

    const fetchList = async () => {
      try {
        const [food, cafe] = await Promise.all([
          getKakaoSearchRes({ query: search, x: position.x, y: position.y }),
          getKakaoSearchCafe({ query: search, x: position.x, y: position.y }),
        ]);
        // 응답 결과 저장
        if (ignore) return;

        const restaurants = [...food, ...cafe].map(item => {
          const [, group = '', desc = ''] = item.category_name.split(' > ');
          return {
            id: item.id,
            name: item.place_name,
            category: item.category_group_name,
            category_group: group,
            description: desc,
            address: item.road_address_name,
            distance: item.distance,
            x: item.x,
            y: item.y,
          };
        });

        restaurants.forEach(item => console.log(item));

        dispatch(setSearchRestaurant(restaurants));
      } catch (err) {
        console.error(err);
      }
    };
    fetchList();
  };

  // 엔터 제출 이벤트
  const onKeyDown = e => {
    if (e.keyCode === 13) {
      //검색
      searchRes();
    }
  };

  const clearSearch = () => {
    setSearch('');
    dispatch(resetSearch());

    const { naver } = window;
    if (naver && mapInstance.current && position) {
      mapInstance.current.setCenter(
        new naver.maps.LatLng(position.y, position.x),
      );
    }
    contentRef.current?.focus();
  };

  return (
    <main className="main-map-page">
      <div className="map-area">
        <div ref={mapRef} className="main-map"></div>
        <div className="search-bar-wrap">
          <SearchInput
            ref={contentRef}
            placeholder={'내 주변 식당 찾기'}
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              if (e.target.value === '') dispatch(resetSearch());
            }}
            onKeyDown={onKeyDown}
            clearSearch={clearSearch}
            isSearching={isSearching}
          />
          <CategoryButton />
        </div>
      </div>
      <RestaurantList />
    </main>
  );
}
