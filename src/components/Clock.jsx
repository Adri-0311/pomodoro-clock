import '../css/Clock.css';
import { TYPE_SESSION } from '../constants/const';
import ProgressBar from './ProgressBar';

export default function Clock({
  timerState,
  sessionType,
  timeDisplay,
  handlePlayPause,
  handleReset,
  audioAlarm,
  timeLeft,
}) {
  return (
    <div className='clock-container'>
      <div id='timer-label'>
        {sessionType === TYPE_SESSION ? 'Session' : 'Break'}
      </div>
      <div id='time-left'>{timeDisplay}</div>
      <ProgressBar
        timeLeft={timeLeft}
        status={timerState.status}
        sessionType={timerState.sessionType}
        sessionTime={timerState.sessionTime}
        breakTime={timerState.breakTime}
      />
      <button id='start_stop' onClick={handlePlayPause}>
        <i className='fa-solid fa-circle-play'></i>
        <i className='fa-solid fa-circle-pause'></i>
      </button>
      <button id='reset' onClick={handleReset}>
        <i className='fa-solid fa-rotate'></i>
      </button>
      <audio
        id='beep'
        src='https://actions.google.com/sounds/v1/alarms/beep_short.ogg'
        preload='auto'
        ref={audioAlarm}
      ></audio>
    </div>
  );
}
