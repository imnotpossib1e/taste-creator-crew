import { configureStore, createSlice } from '@reduxjs/toolkit';
import authReducer from './authSlice';

const initialState = [];

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    // 리스트 담기
    setRestaurant(state, action) {
      return action.payload;
    },

    // 초기화
    reset() {
      return initialState;
    },
  },
});

export const { setRestaurant, reset } = restaurantSlice.actions;

export default configureStore({
  reducer: {
    restaurant: restaurantSlice.reducer,
    auth: authReducer,
  },
});
