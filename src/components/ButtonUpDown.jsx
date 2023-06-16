import '../css/ButtonUpDown.css';
export default function ButtonUpDown({ id, handleLength, params, isUp }) {
  let icon = `fa-solid ${isUp ? 'fa-circle-arrow-up' : 'fa-circle-arrow-down'}`;
  return (
    <button id={id} onClick={() => handleLength(params)}>
      <i className={icon}></i>
    </button>
  );
}
