import '../css/Clock.css';
import { TYPE_SESSION } from '../constants/const';
import ProgressBar from './ProgressBar';
import { useSelector } from 'react-redux';

export default function Clock({
  timeLeft,
  handlePlayPause,
  handleReset,
  audioAlarm,
}) {
  const timerState = useSelector((store) => store.timerState);

  /**
   *
   * @param {number} time
   * @returns :string mm:ss
   */
  const timeDisplay = () => {
    const date = new Date(0);
    date.setSeconds(timeLeft);
    let dateFormat = date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    dateFormat = dateFormat.split(':');
    return dateFormat[0] === '02' ? '60:00' : dateFormat.slice(1).join(':');
  };

  return (
    <div className='clock-container'>
      <div id='timer-label'>
        {timerState.sessionType === TYPE_SESSION ? 'Session' : 'Break'}
      </div>
      <div id='time-left'>{timeDisplay()}</div>
      <ProgressBar timeLeft={timeLeft} />

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
