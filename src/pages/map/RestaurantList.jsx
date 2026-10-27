import { shallowEqual, useSelector } from 'react-redux';
import './restaurantList.css';
import RestaurantItem from './RestaurantItem';

export default function RestaurantList() {
  const datas = useSelector(state => {
    return state.restaurant;
  }, shallowEqual);

  return (
    <div className="resList">
      <div className="listTitle">
        <span>주변 식당 목록</span>
        <select name="sort" id="sort" size="1">
          <option value="distance" defaultValue>
            가까운 순
          </option>
          <option value="bookmark">북마크 순</option>
          <option value="review">리뷰 많은 순</option>
        </select>
      </div>
      <div className="resItems">
        {datas.map(data => (
          <RestaurantItem key={data.id} data={data} />
        ))}
      </div>
    </div>
  );
}
