import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSession, logIn as authLogIn, logOut as authLogOut } from '../auth';

// 비동기 로그인 thunk
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const result = await authLogIn({ email, password });
      if (!result.ok) {
        return rejectWithValue(result.message || '로그인에 실패했습니다.');
      }
      const session = getSession();
      return session;
    } catch (error) {
      return rejectWithValue(error.message || '로그인 중 오류가 발생했습니다.');
    }
  },
);

const initialSession = getSession();

const initialState = {
  isLoggedIn: Boolean(initialSession),
  user: initialSession || null,
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
      authLogOut();
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
