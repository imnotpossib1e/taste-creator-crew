import { Link } from 'react-router';
import './restaurantItem.css';
import { Bookmark } from 'lucide-react';
const CATEGORY_IMG = {
  한식: 'korean.svg',
  중식: 'chinese.svg',
  일식: 'japanese.svg',
  양식: 'american.svg',
  카페: 'cafe.svg',
  분식: 'snack.svg',
  술집: 'bar.svg',
  간식: 'bakery.svg',
  치킨: 'chicken.svg',
  패스트푸드: 'fastfood.svg',
  샐러드: 'salad.svg',
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
            <div style={{ maxWidth: '170px', wordBreak: 'normal' }}>
              {data.name}
            </div>
            {data.descroption ?? <span>{data.description}</span>}
          </div>
          <div className="resInfo">
            {data.category_group ?? <span>{data.category_group}</span>}
            <span>{data.distance}m</span>
            <div style={{ display: 'flex', gap: '4px' }}>
              <span style={{ color: '#F59E0B' }}>★</span>
              {data.rating_avg.toFixed(1)}
            </div>
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              <Bookmark size={'14px'} />
              {data.bookmark_count}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
