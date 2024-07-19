import { format } from 'date-fns';

const formatTime = (playTime) => {
  const minutes = Math.floor(playTime / 1000 / 60);
  const seconds = format(playTime, 's.SS');

  let result = '';
  if (minutes > 0) {
    result += `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}, `;
  }
  result += `${seconds} ${seconds === 1 ? 'second' : 'seconds'}`;

  return result;
};

export { formatTime };
