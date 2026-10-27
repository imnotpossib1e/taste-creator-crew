import { configureStore, createSlice } from '@reduxjs/toolkit';
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

export const { setRestaurant, reset } = restaurantSlice.actions;
export const { setSearchRestaurant, resetSearch } =
  restaurantSearchSlice.actions;

export const selectVisibleRestaurants = state =>
  state.searchRestaurant ?? state.restaurant;

export default configureStore({
  reducer: {
    restaurant: restaurantSlice.reducer,
    searchRestaurant: restaurantSearchSlice.reducer,
    auth: authReducer,
  },
});
