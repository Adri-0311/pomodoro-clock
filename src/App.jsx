import { useEffect, useRef, useState } from 'react';
import {
  BREAK_TIME,
  SESSION_TIME,
  PAUSE,
  PLAY,
  TYPE_SESSION,
  TYPE_BREAK,
} from './constants/const';
import ButtonUpDown from './components/ButtonUpDown.jsx';
import Clock from './components/Clock.jsx';
import './App.css';

function App() {
  const initState = {
    status: PAUSE,
    sessionType: TYPE_SESSION,
    sessionTime: SESSION_TIME,
    breakTime: BREAK_TIME,
  };
  const [timerState, setTimerState] = useState(initState);
  const [timeLeft, setTimeLeft] = useState(SESSION_TIME * 60);
  const [intervalId, setIntervalId] = useState();
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
          setTimerState({ ...timerState, breakTime: time });
          break;
        case TYPE_SESSION:
          setTimerState({
            ...timerState,
            sessionTime: time,
          });
          setTimeLeft(time * 60);
          break;
      }
    }
  };

  const handleReset = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setTimerState(initState);
      setTimeLeft(SESSION_TIME * 60);
      audioAlarm.current.pause();
      audioAlarm.current.currentTime = 0;
    } else {
      setTimerState(initState);
      setTimeLeft(SESSION_TIME * 60);
    }
  };

  /**
   * Manejador del timer
   */
  const handlePlayPause = () => {
    if (timerState.status === PAUSE) {
      countDown();
      setTimerState({
        ...timerState,
        status: PLAY,
      });
    } else {
      clearInterval(intervalId);
      setTimerState({ ...timerState, status: PAUSE });
    }
  };

  const countDown = () => {
    setIntervalId(
      setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1000)
    );
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
    clearInterval(intervalId);
    setTimerState({
      ...timerState,
      sessionType:
        timerState.sessionType === TYPE_SESSION ? TYPE_BREAK : TYPE_SESSION,
    });
    setTimeLeft(
      timerState.sessionType === TYPE_SESSION
        ? timerState.breakTime * 60
        : timerState.sessionTime * 60
    );
  };

  /**
   *
   * @param {number} time
   * @returns :string mm:ss
   */
  const timeDisplay = (time) => {
    const date = new Date(0);
    date.setSeconds(time);
    let dateFormat = date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    dateFormat = dateFormat.split(':');
    return dateFormat[0] === '02' ? '60:00' : dateFormat.slice(1).join(':');
  };

  return (
    <>
      <h1 className="title">Pomodoro Clock</h1>

      <div className="container-break-session">
        <Clock
          timerState={timerState}
          sessionType={timerState.sessionType}
          timeDisplay={timeDisplay(timeLeft)}
          handlePlayPause={handlePlayPause}
          handleReset={handleReset}
          audioAlarm={audioAlarm}
          timeLeft={timeLeft}
        />

        <div className="break-container">
          <div id="break-label" className="label">
            Break Length
          </div>
          <ButtonUpDown
            id="break-decrement"
            handleLength={handleLength}
            params={{ time: timerState.breakTime, value: -1, type: TYPE_BREAK }}
            isUp={false}
          />
          <span id="break-length">{timerState.breakTime}</span>
          <ButtonUpDown
            id="break-increment"
            handleLength={handleLength}
            params={{ time: timerState.breakTime, value: 1, type: TYPE_BREAK }}
            isUp={true}
          />
        </div>

        <div className="session-container">
          <div id="session-label" className="label">
            Session Length
          </div>
          <ButtonUpDown
            id="session-decrement"
            handleLength={handleLength}
            params={{
              time: timerState.sessionTime,
              value: -1,
              type: TYPE_SESSION,
            }}
            isUp={false}
          />
          <span id="session-length">{timerState.sessionTime}</span>
          <ButtonUpDown
            id="session-increment"
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

      <p className="text-center">
        Original app:&nbsp;
        <a href="https://25--5-clock.freecodecamp.rocks/" target="_balank">
          FCC : 25 + 5 Clock
        </a>
      </p>

      <a href="https://github.com/Adri-0311/pomodoro-clock" className="github">
        <i className="fa-brands fa-github"></i>
      </a>
    </>
  );
}

export default App;
