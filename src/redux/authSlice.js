import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCurrentUser, logIn, logOut } from '../hook/user';

// 비동기 로그인 thunk (Supabase 세션 + users 테이블)
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      return await logIn({ email, password });
    } catch (error) {
      return rejectWithValue(error.message || '로그인 중 오류가 발생했습니다.');
    }
  },
);

// 앱 시작 시 한 번 dispatch: Supabase 세션이 남아 있으면 로그인 상태 복원
export const restoreUser = createAsyncThunk('auth/restoreUser', () => getCurrentUser());

const initialState = {
  isLoggedIn: false,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // 동기식 로그인 상태 저장 (필요 시 직접 설정)
    setCredentials(state, action) {
      state.user = action.payload;
      state.isLoggedIn = Boolean(action.payload);
      state.error = null;
    },
    // 로그아웃
    logout(state) {
      logOut();
      state.user = null;
      state.isLoggedIn = false;
      state.loading = false;
      state.error = null;
    },
    // 사용자 프로필 정보 갱신
    updateUser(state, action) {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      }
    },
    // 에러 상태 초기화
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(restoreUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = Boolean(action.payload);
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.error = action.payload;
      });
  },
});

export const { setCredentials, logout, updateUser, clearError } = authSlice.actions;

// Selectors
export const selectAuth = (state) => state.auth;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectCurrentUser = (state) => state.auth.user;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;
