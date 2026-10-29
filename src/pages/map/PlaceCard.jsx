import { Link } from 'react-router-dom';
import './placeCard.css';
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

export default function PlaceCard({ place }) {
  return (
    <div className="frameWrap">
      <div className="placeWrap">
        {/* <span>{place.category_group}</span> */}
        <Link to={`/store/${place.id}`} className="placeLink">
          <div className="linkWrap">
            <img
              src={`/${CATEGORY_IMG[place.category_group] ?? 'default.svg'}`}
              alt={place.category_group}
              className="itemImg"
            />
            <div className="infoWrap">
              <div className="placeTitle">
                {place.name}
                <span>
                  {place.descroption ?? <span>{place.description}</span>}
                </span>
              </div>
              <div className="infoDesWrap">
                {place.category_group && <span>{place.category_group}</span>}
                <span>{place.distance}m</span>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <span style={{ color: '#F59E0B' }}>★</span>
                  <span>{place.rating_avg.toFixed(1)}</span>
                </div>
                <div
                  style={{ display: 'flex', gap: '4px', alignItems: 'center' }}
                >
                  <Bookmark size={'14px'} />
                  {place.bookmark_count}
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
