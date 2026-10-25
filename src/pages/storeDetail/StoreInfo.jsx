import './storeInfo.css';

const PLACE_URL = '';

function StoreInfo() {
  return (
    <section className="storeInfo">
      <iframe className="storeInfoFrame" src={PLACE_URL} title="가게 정보" />
    </section>
  );
}

export default StoreInfo;
