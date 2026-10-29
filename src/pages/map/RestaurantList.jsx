import { useSelector } from 'react-redux';
import './restaurantList.css';
import RestaurantItem from './RestaurantItem';
import { selectVisibleRestaurants } from '../../redux/store';
import { useMemo, useState } from 'react';
import PlaceCard from './PlaceCard';

const SORTERS = {
  distance: (a, b) => Number(a.distance) - Number(b.distance),
  bookmark: (a, b) => (b.bookmark_count ?? 0) - (a.bookmark_count ?? 0),
  review_count: (a, b) => (b.review_count ?? 0) - (a.review_count ?? 0),
  review: (a, b) => (b.rating_avg ?? 0) - (a.rating_avg ?? 0),
};

export default function RestaurantList({ place }) {
  const datas = useSelector(selectVisibleRestaurants);
  const [sort, setSort] = useState('distance');

  const sorted = useMemo(() => [...datas].sort(SORTERS[sort]), [datas, sort]);

  return (
    <div className="resList">
      <div className="listTitle">
        <span>여기서 먹을지도?</span>
        <select
          name="sort"
          id="sort"
          onChange={e => setSort(e.target.value)}
          value={sort}
        >
          <option value="distance" defaultValue>
            가까운 순
          </option>
          <option value="bookmark">북마크 순</option>
          <option value="review">별점 높은 순</option>
          <option value="review_count">리뷰 많은 순</option>
        </select>
      </div>
      {place && <PlaceCard place={place} />}
      <div className="resItems">
        {sorted.map(data => (
          <RestaurantItem key={data.id} data={data} />
        ))}
      </div>
    </div>
  );
}
