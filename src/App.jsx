import './App.css';
import { useEffect, useRef, useState } from 'react';
import {
  SESSION_TIME,
  PAUSE,
  PLAY,
  TYPE_SESSION,
  TYPE_BREAK,
} from './constants/const';
import ButtonUpDown from './components/ButtonUpDown.jsx';
import Clock from './components/Clock.jsx';
import { useSelector, useDispatch } from 'react-redux';
import {
  timerInit,
  updateStatus,
  updateSessionType,
  updateSessionTime,
  updateBreakTime,
} from './app/timer/timerSlider';

function App() {
  const dispatch = useDispatch();
  const timerState = useSelector((state) => state.timerState);
  const [timeLeft, setTimeLeft] = useState(SESSION_TIME * 60);
  const intervalId = useRef();
  const audioAlarm = useRef(null);

  /**
   * Manejador de la duración de la 'session' y 'break', limitando el timepo a minimo 1 y máximo 60.
   * En función del 'type' setear el state correspondiente.
   * @param {JSON} values
   */
  const handleLength = (values) => {
    const time = values.time + values.value;
    if (time > 0 && time < 61) {
      switch (values.type) {
        case TYPE_BREAK:
          dispatch(updateBreakTime({ breakTime: time }));
          break;
        case TYPE_SESSION:
          dispatch(updateSessionTime({ sessionTime: time }));
          setTimeLeft(time * 60);
          break;
      }
    }
  };

  const handleReset = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
      dispatch(timerInit());
      setTimeLeft(SESSION_TIME * 60);
      audioAlarm.current.pause();
      audioAlarm.current.currentTime = 0;
    } else {
      dispatch(timerInit());
      setTimeLeft(SESSION_TIME * 60);
    }
  };

  /**
   * Manejador del timer
   */
  const handlePlayPause = () => {
    if (timerState.status === PAUSE) {
      countDown();
      dispatch(updateStatus({ status: PLAY }));
    } else {
      clearInterval(intervalId.current);
      dispatch(updateStatus({ status: PAUSE }));
    }
  };

  const countDown = () => {
    intervalId.current = setInterval(() => {
      setTimeLeft((timeLeft) => timeLeft - 1);
    }, 1000);
  };

  useEffect(() => {
    control();
  }, [timeLeft]);

  const control = () => {
    if (timeLeft <= 0) {
      changeSessionBreak();
      audioAlarm.current.play();
      countDown();
    }
  };

  const changeSessionBreak = () => {
    clearInterval(intervalId.current);
    dispatch(
      updateSessionType({
        sessionType:
          timerState.sessionType === TYPE_SESSION ? TYPE_BREAK : TYPE_SESSION,
      })
    );
    setTimeLeft(
      timerState.sessionType === TYPE_SESSION
        ? timerState.breakTime * 60
        : timerState.sessionTime * 60
    );
  };

  return (
    <>
      <h1 className='title'>Pomodoro Clock</h1>

      <div className='container-break-session'>
        <Clock
          timeLeft={timeLeft}
          handlePlayPause={handlePlayPause}
          handleReset={handleReset}
          audioAlarm={audioAlarm}
        />

        <div className='break-container'>
          <div id='break-label' className='label'>
            Break Length
          </div>
          <ButtonUpDown
            id='break-decrement'
            handleLength={handleLength}
            params={{ time: timerState.breakTime, value: -1, type: TYPE_BREAK }}
            isUp={false}
          />
          <span id='break-length'>{timerState.breakTime}</span>
          <ButtonUpDown
            id='break-increment'
            handleLength={handleLength}
            params={{ time: timerState.breakTime, value: 1, type: TYPE_BREAK }}
            isUp={true}
          />
        </div>

        <div className='session-container'>
          <div id='session-label' className='label'>
            Session Length
          </div>
          <ButtonUpDown
            id='session-decrement'
            handleLength={handleLength}
            params={{
              time: timerState.sessionTime,
              value: -1,
              type: TYPE_SESSION,
            }}
            isUp={false}
          />
          <span id='session-length'>{timerState.sessionTime}</span>
          <ButtonUpDown
            id='session-increment'
            handleLength={handleLength}
            params={{
              time: timerState.sessionTime,
              value: 1,
              type: TYPE_SESSION,
            }}
            isUp={true}
          />
        </div>
      </div>

      <p className='text-center'>
        Original app:&nbsp;
        <a href='https://25--5-clock.freecodecamp.rocks/' target='_balank'>
          FCC : 25 + 5 Clock
        </a>
      </p>

      <a href='https://github.com/Adri-0311/pomodoro-clock' className='github'>
        <i className='fa-brands fa-github'></i>
      </a>
    </>
  );
}

export default App;
