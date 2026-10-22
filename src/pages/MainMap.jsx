import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRestaurant, reset } from '../redux/store';

export default function MainMap() {
  const mapRef = useRef(null);
  const [lat, setLat] = useState(37.566826);
  const [lon, setLon] = useState(126.9786567);

  const dispatch = useDispatch();
  useEffect(() => {
    const getCurrentPosition = () => {
      navigator.geolocation.getCurrentPosition(position => {
        // console.log(position);
        // position 매개 변수는 현재 위치정보를 포함하고 있습니다.
        // position에서 위도값과 경도값을 구합니다.
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
      });
    };
    getCurrentPosition();
  }, []);

  useEffect(() => {
    // 좌표가 바뀌었을 때 리스트 초기화
    dispatch(reset());

    const kakao = window.kakao;
    if (!kakao) {
      console.log('Kakao Map API is not load');
      return;
    }
    // console.log(kakao);

    // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
    // var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    // var mapContainer = document.getElementById('map'), // 지도를 표시할 div
    //   mapOption = {
    //     center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
    //     level: 3, // 지도의 확대 레벨
    //   };
    var mapContainer = mapRef.current;

    var mapOption = {
      center: new kakao.maps.LatLng(lat, lon), // 지도의 중심좌표
      level: 5, // 지도의 확대 레벨
    };

    // 지도를 생성합니다
    var map = new kakao.maps.Map(mapContainer, mapOption);

    const iwContent = name => {
      return `<div style="padding:5px;">${name}</div>`;
    };

    // var iwContent = '<div style="padding:5px;">Hello World!</div>'; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    // var iwPosition = new kakao.maps.LatLng(33.450701, 126.570667); //인포윈도우 표시 위치입니다

    /* var myLocation =
      '<div style="width:5px; height:5px; background-color: green; border-radius:50%;"></div>'; */

    // if (!kakao.maps.services) {
    //   console.error('Kakao Maps services is not available');
    //   return;
    // }
    // 장소 검색 객체를 생성합니다
    var ps = new kakao.maps.services.Places(map);

    // 카테고리로 음식점을 검색합니다
    ps.categorySearch('FD6', placesSearchCB, { useMapBounds: true });

    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    function placesSearchCB(data, status) {
      if (status === kakao.maps.services.Status.OK) {
        for (var i = 0; i < data.length; i++) {
          displayMarker(data[i]);

          const newRestaurant = {
            id: data[i].id,
            name: data[i].place_name,
            phone: data[i].phone,
            category_group: data[i].category_group_name,
            category: data[i].category_name,
            address: data[i].raod_address_name,
            lat: data[i].x,
            lon: data[i].y,
          };

          // store에 장소 담기
          dispatch(addRestaurant(newRestaurant));
        }
      }
      displayMyLoc();
    }

    // 지도에 마커를 표시하는 함수입니다
    function displayMarker(place) {
      var infowindow = new kakao.maps.InfoWindow({
        map: map, // 인포윈도우가 표시될 지도
        position: new kakao.maps.LatLng(place.y, place.x),
        content: iwContent(place.place_name),
      });

      //   // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(infowindow, 'click', function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            '</div>',
        );
        infowindow.open(map, infowindow);
      });
    }

    // 내 위치 표시
    function displayMyLoc() {
      // 마커를 생성하고 지도에 표시합니다
      /*  var infowindow = new kakao.maps.InfoWindow({
        map: map, // 인포윈도우가 표시될 지도
        position: new kakao.maps.LatLng(lat, lon),
        content: myLocation,
      }); */

      // 마커를 생성하고 지도에 표시합니다
      var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(lat, lon),
      });

      marker.open(map, marker);
    }
  }, [lat, lon]);
  // let list = useSelector(state => state.restaurant);
  // console.log(list);

  return (
    <>
      {/* <h1>지도</h1> */}
      <div ref={mapRef} style={{ width: '390px', height: '360px' }}></div>
    </>
  );
}
