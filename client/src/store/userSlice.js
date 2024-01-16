import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'users',
  initialState: {},
  reducers: {
    setUser(state, action) {
      return { ...state, ...action.payload };
    },
    logoutUser(state, action) {
      // Đặt lại trạng thái người dùng về mặc định khi logout
      return {};
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
