import { Link } from 'react-router-dom';
import './placeCard.css';

const CATEGORY_IMG = {
  한식: 'korean.svg',
  중식: 'chinese.svg',
  일식: 'japanese.svg',
  양식: 'american.svg',
  카페: 'cafe.svg',
  분식: 'snack.svg',
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
              <div className="placeTitle">{place.name}</div>
              <div className="infoDesWrap">
                {place.category_group && <span>{place.category_group}</span>}
                <span>{place.distance}m</span>
              </div>
              <div>리뷰키워드</div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
