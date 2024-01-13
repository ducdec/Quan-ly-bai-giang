import { combineReducers } from '@reduxjs/toolkit';
import userSlice from './userSlice';
const rootReducer = combineReducers({
  data: userSlice,
});

export default rootReducer;
