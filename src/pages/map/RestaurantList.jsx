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
          <option value="distance" selected>
            가까운 순
          </option>
          <option value="bookmark">북마크 순</option>
          <option value="review">리뷰 많은 순</option>
        </select>
      </div>
      <div className="resItems">
        {datas.map((data, index) => (
          <div key={data.id}>
            <RestaurantItem data={data} />

            {index < datas.length - 1 && (
              <hr
                style={{
                  width: '100%',
                  backgroundColor: 'lightgray',
                  height: '1px',
                  border: '0',
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
