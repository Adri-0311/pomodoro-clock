import { TYPE_SESSION, TYPE_BREAK, PLAY } from '../constants/const';
import '../css/ProgressBar.css';

export default function ProgressBar({
  timeLeft,
  status,
  sessionType,
  sessionTime,
  breakTime,
}) {
  const percentOfTime =
    sessionType === TYPE_SESSION
      ? ((timeLeft / (sessionTime * 60)) * 100).toFixed(1)
      : ((timeLeft / (breakTime * 60)) * 100).toFixed(1);

  let color = 'text-bg-secondary';
  if (status === PLAY && sessionType === TYPE_SESSION) {
    color = 'text-bg-success';
  } else if (status === PLAY && sessionType === TYPE_BREAK) {
    color = 'text-bg-danger';
  }
  return (
    <div
      className='progress'
      role='progressbar'
      aria-label='Time left'
      aria-valuenow={percentOfTime}
      aria-valuemin='0'
      aria-valuemax='100'
    >
      <div
        className={'progress-bar overflow-visible ' + color}
        style={{ width: percentOfTime + '%' }}
      ></div>
    </div>
  );
}
