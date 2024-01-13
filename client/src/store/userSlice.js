import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'users',
  initialState: {},
  reducers: {
    setUser(state, { payload }) {
      state = Object.assign(state, payload);
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
