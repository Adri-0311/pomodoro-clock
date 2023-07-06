import { createSlice } from '@reduxjs/toolkit';
import {
  BREAK_TIME,
  SESSION_TIME,
  PAUSE,
  TYPE_SESSION,
} from '../../constants/const';

const initState = {
  status: PAUSE,
  sessionType: TYPE_SESSION,
  sessionTime: SESSION_TIME,
  breakTime: BREAK_TIME,
};

export const timerSlider = createSlice({
  name: 'timerState',
  initialState: initState,
  reducers: {
    timerInit: (state) => {
      return { ...state, ...initState };
    },
    updateStatus: (state, action) => {
      state.status = action.payload.status;
    },
    updateSessionType: (state, action) => {
      state.sessionType = action.payload.sessionType;
    },
    updateSessionTime: (state, action) => {
      state.sessionTime = action.payload.sessionTime;
    },
    updateBreakTime: (state, action) => {
      state.breakTime = action.payload.breakTime;
    },
  },
});

export const {
  timerInit,
  updateStatus,
  updateSessionType,
  updateSessionTime,
  updateBreakTime,
} = timerSlider.actions;
export default timerSlider.reducer;
