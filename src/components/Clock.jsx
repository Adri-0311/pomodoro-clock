import "../css/Clock.css";

export default function Clock(props) {
  return (
    <div className="clock-container">
      <div id="timer-label">
        {props.sessionType === props.typeSession ? "Session" : "Break"}
      </div>
      <div id="time-left">{props.timeDisplay}</div>
      <button id="start_stop" onClick={props.handlePlayPause}>
        <i className="fa-solid fa-circle-play"></i>
        <i className="fa-solid fa-circle-pause"></i>
      </button>
      <button id="reset" onClick={props.handleReset}>
        <i className="fa-solid fa-rotate"></i>
      </button>
      <audio
        id="beep"
        src="https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
        preload="auto"
        ref={props.audioAlarm}
      ></audio>
    </div>
  );
}
