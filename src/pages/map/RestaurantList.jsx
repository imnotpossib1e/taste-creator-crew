import { shallowEqual, useSelector } from 'react-redux';
import './restaurantList.css';
import RestaurantItem from './RestaurantItem';
import { selectVisibleRestaurants } from '../../redux/store';
import { useMemo, useState } from 'react';

const SORTERS = {
  distance: (a, b) => Number(a.distance) - Number(b.distance),
  bookmark: (a, b) => (b.bookmark_count ?? 0) - (a.bookmark_count ?? 0),
  review: (a, b) => (b.review_count ?? 0) - (a.review_count ?? 0),
};

export default function RestaurantList() {
  const datas = useSelector(selectVisibleRestaurants);
  const [sort, setSort] = useState('distance');

  const sorted = useMemo(() => [...datas].sort(SORTERS[sort]), [datas, sort]);

  return (
    <div className="resList">
      <div className="listTitle">
        <span>주변 식당 목록</span>
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
          <option value="review">리뷰 많은 순</option>
        </select>
      </div>
      <div className="resItems">
        {sorted.map(data => (
          <RestaurantItem key={data.id} data={data} />
        ))}
      </div>
    </div>
  );
}
