import '../css/ProgressBar.css';
import { TYPE_SESSION, TYPE_BREAK, PLAY } from '../constants/const';
import { useSelector } from 'react-redux';

export default function ProgressBar({timeLeft}) {
  const timerState = useSelector((store) => store.timerState);
  const percentOfTime =
    timerState.sessionType === TYPE_SESSION
      ? ((timeLeft / (timerState.sessionTime * 60)) * 100).toFixed(1)
      : ((timeLeft / (timerState.breakTime * 60)) * 100).toFixed(1);

  let color = 'text-bg-secondary';
  if (timerState.status === PLAY && timerState.sessionType === TYPE_SESSION) {
    color = 'text-bg-success';
  } else if (
    timerState.status === PLAY &&
    timerState.sessionType === TYPE_BREAK
  ) {
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
