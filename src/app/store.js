import { configureStore } from '@reduxjs/toolkit';
import timerReducer from './timer/timerSlider';

export default configureStore({
  reducer: {
    timerState: timerReducer,
  },
});
