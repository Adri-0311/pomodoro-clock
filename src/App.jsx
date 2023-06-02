import { useState } from "react";
import {accurateInterval} from 'accurate-interval';
import "./App.css";

function App() {
  const BREAK_TIME = 5,
    SESSION_TIME = 1,
    PAUSE = 0,
    PLAY = 1,
    TYPE_SESSION = 10,
    TYPE_BREAK = 11;
  const initState = {
    status: PAUSE,
    sessionType: TYPE_SESSION,
    sessionTime: SESSION_TIME,
    breakTime: BREAK_TIME,
    timeLeft: SESSION_TIME * 60,
    intervalId: 0,
  };
  const [timerState, setTimerState] = useState(initState);

  const handleReset = () => {
    if (timerState.intervalId !== 0) {
      timerState.intervalId.clear();
      setTimerState(initState);
    } else {
      setTimerState(initState);
    }
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
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    dateFormat = dateFormat.split(":");
    return dateFormat[0] == "02" ? "60:00" : dateFormat.slice(1).join(":");
  };

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
          setTimerState({ ...timerState, sessionTime: time });
          setTimerState({ ...timerState, timeLeft: time * 60 });
          break;
      }
    }
  };

  /**
   * Manejador del timer
   */
  const handlePlayPause = () => {
    if (timerState.status === PAUSE) {
      countDown(timerState.timeLeft);
      setTimerState({ ...timerState, status: PLAY });
    } else {
      clearInterval(timerState.intervalId);
      setTimerState({ ...timerState, status: PAUSE });
    }
  };

  const countDown = () => {
    setTimerState({
      ...timerState,
      intervalId: accurateInterval(() => {
        decrementTime();
      }, 1000)
    });
  };

  const decrementTime = () => {
    setTimerState({ ...timerState, timeLeft: (timerState.timeLeft - 1) });
  };

  return (
    <>
      <h1 className="title">Promodoro Clock</h1>

      <div className="container-break-session">
        <div className="break-container">
          <div id="break-label">Break Length</div>
          <button
            id="break-decrement"
            onClick={() =>
              handleLength({
                time: timerState.breakTime,
                value: -1,
                type: TYPE_BREAK,
              })
            }
          >
            <i className="fa-solid fa-circle-arrow-down"></i>
          </button>
          <span id="break-length">{timerState.breakTime}</span>
          <button
            id="break-increment"
            onClick={() =>
              handleLength({
                time: timerState.breakTime,
                value: 1,
                type: TYPE_BREAK,
              })
            }
          >
            <i className="fa-solid fa-circle-arrow-up"></i>
          </button>
        </div>

        <div className="session-container">
          <div id="session-label">Session Length</div>
          <button
            id="session-decrement"
            onClick={() =>
              handleLength({
                time: timerState.sessionTime,
                value: -1,
                type: TYPE_SESSION,
              })
            }
          >
            <i className="fa-solid fa-circle-arrow-down"></i>
          </button>
          <span id="session-length">{timerState.sessionTime}</span>
          <button
            id="session-increment"
            onClick={() =>
              handleLength({
                time: timerState.sessionTime,
                value: 1,
                type: TYPE_SESSION,
              })
            }
          >
            <i className="fa-solid fa-circle-arrow-up"></i>
          </button>
        </div>

        <div className="clock-container">
          <div id="timer-label">Session</div>
          <div id="time-left">{timeDisplay(timerState.timeLeft)}</div>
          <button id="start_stop" onClick={handlePlayPause}>
            <i className="fa-solid fa-circle-play"></i>
            <i className="fa-solid fa-circle-pause"></i>
          </button>
          <button id="reset" onClick={handleReset}>
            <i className="fa-solid fa-rotate"></i>
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
