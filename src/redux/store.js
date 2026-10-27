import { configureStore, createSlice } from '@reduxjs/toolkit';
import authReducer from './authSlice';

const initialState = [];

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    // 리스트 담기
    addRestaurant(state, action) {
      state.push(action.payload);
    },

    // 초기화
    reset() {
      return initialState;
    },
  },
});

export const { addRestaurant, reset } = restaurantSlice.actions;

export const selectRestaurants = state => state.restaurant;

export default configureStore({
  reducer: {
    restaurant: restaurantSlice.reducer,
    auth: authReducer,
  },
});
