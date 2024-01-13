import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';

const configureAppStore = () => {
  const store = configureStore({
    reducer: rootReducer,
  });

  return store;
};

export default configureAppStore;
