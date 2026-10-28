import { configureStore, createSelector, createSlice } from '@reduxjs/toolkit';
import authReducer from './authSlice';

const initialState = [];

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    // 리스트 담기
    setRestaurant(state, action) {
      return [...action.payload].sort(
        (a, b) => Number(a.distance) - Number(b.distance),
      );
    },

    // 초기화
    reset() {
      return initialState;
    },
    updateStats(state, action) {
      const { id, ...stats } = action.payload;
      const target = state.find(p => p.id === id);
      if (target) Object.assign(target, stats);
    },
  },
});

const restaurantSearchSlice = createSlice({
  name: 'searchRestaurant',
  initialState: null, // 검색 안 한 상태
  reducers: {
    setSearchRestaurant: (state, action) => {
      return [...action.payload].sort(
        (a, b) => Number(a.distance) - Number(b.distance),
      );
    },
    resetSearch: () => null,
  },
});
const categorySlice = createSlice({
  name: 'category',
  initialState: '전체',
  reducers: {
    setCategory: (state, action) => action.payload,
  },
});

export const { setCategory } = categorySlice.actions;
export const { setRestaurant, reset, updateStats } = restaurantSlice.actions;
export const { setSearchRestaurant, resetSearch } =
  restaurantSearchSlice.actions;
const selectBaseRestaurants = state =>
  state.searchRestaurant ?? state.restaurant;

export const selectVisibleRestaurants = createSelector(
  [selectBaseRestaurants, state => state.category],
  (list, category) =>
    category === '전체'
      ? list
      : list.filter(p => p.category_group === category),
);

export const selectRestaurants = state => state.restaurant;

export default configureStore({
  reducer: {
    restaurant: restaurantSlice.reducer,
    searchRestaurant: restaurantSearchSlice.reducer,
    category: categorySlice.reducer, //
    auth: authReducer,
  },
});
