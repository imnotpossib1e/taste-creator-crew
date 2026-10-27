import { Link } from 'react-router';
import './restaurantItem.css';
const CATEGORY_IMG = {
  한식: 'korean.svg',
  중식: 'chinese.svg',
  일식: 'japanese.svg',
  양식: 'american.svg',
  카페: 'cafe.svg',
  분식: 'snack.svg',
  default: 'default.svg',
};
export default function RestaurantItem({ data }) {
  return (
    <Link to={`/store/${data.id}`} className="resItemLink">
      <div className="resItemWrap">
        <img
          src={`/${CATEGORY_IMG[data.category_group] ?? 'default.svg'}`}
          alt={data.category_group}
          className="itemImg"
        />
        <div className="resItem">
          <div className="itemName">
            {data.name}
            {data.descroption ?? <span>{data.description}</span>}
          </div>
          <div className="resInfo">
            {data.category_group ?? <span>{data.category_group}</span>}
            <span>{data.distance}m</span>
            <div style={{ display: 'flex', gap: '4px' }}>
              <span style={{ color: '#F59E0B' }}>★</span>
              {data.rating_avg.toFixed(1)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
