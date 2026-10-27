import './storeInfo.css';

function StoreInfo({ placeId }) {
  return (
    <section className="storeInfo">
      <iframe
        className="storeInfoFrame"
        src={`https://place.map.kakao.com/${placeId}`}
        title="가게 정보"
      />
    </section>
  );
}

export default StoreInfo;
