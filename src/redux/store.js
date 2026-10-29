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
  // 검색 결과에도 같은 가게가 있으면 별점/북마크 수를 같이 맞춘다
  extraReducers: builder => {
    builder.addCase(restaurantSlice.actions.updateStats, (state, action) => {
      if (!state) return;
      const { id, ...stats } = action.payload;
      const target = state.find(p => p.id === id);
      if (target) Object.assign(target, stats);
    });
  },
});
// 주변 가게 목록을 다 불러왔는지 - 빈 배열([])만으로는 '불러오는 중'과 '가게 없음'을 구분할 수 없어서 따로 둔다
// 목록이 담기면(setRestaurant) 자동으로 true, 불러오다 실패해도 true로 바꿔서 스켈레톤이 계속 돌지 않게
const restaurantLoadedSlice = createSlice({
  name: 'restaurantLoaded',
  initialState: false,
  reducers: {
    setRestaurantLoaded: () => true,
  },
  extraReducers: builder => {
    builder.addCase(restaurantSlice.actions.setRestaurant, () => true);
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
export const { setRestaurantLoaded } = restaurantLoadedSlice.actions;
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
export const selectIsRestaurantLoaded = state => state.restaurantLoaded;

export default configureStore({
  reducer: {
    restaurant: restaurantSlice.reducer,
    restaurantLoaded: restaurantLoadedSlice.reducer,
    searchRestaurant: restaurantSearchSlice.reducer,
    category: categorySlice.reducer, //
    auth: authReducer,
  },
});
