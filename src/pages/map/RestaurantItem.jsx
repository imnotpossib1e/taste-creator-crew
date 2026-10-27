import './restaurantItem.css';
const CATEGORY_IMG = {
  한식: 'korean.svg',
  중식: 'chinese.svg',
  일식: 'japanese.svg',
  양식: 'american.svg',
  카페: 'cafe.svg',
  분식: 'snack.svg',
  기본: 'default.svg',
};
export default function RestaurantItem({ data }) {
  return (
    <div className="resItemwrap">
      <img
        src={`/${CATEGORY_IMG[data.category_group] ?? 'default'}`}
        alt={data.category_group}
        className="itemImg"
      />
      <div className="resItem">
        <div className="itemTitle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-utensils preview-icon"
          >
            <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
            <path d="M7 2v20" />
            <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
          </svg>
          <div className="itemName">
            {data.name}
            <span>{data.description}</span>
          </div>
        </div>
        <div className="resInfo">
          <span>{data.category_group}</span>
          <span>{data.distance}m</span>
          <span>별점</span>
        </div>
      </div>
    </div>
  );
}
