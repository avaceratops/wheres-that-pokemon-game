import { Duration } from 'luxon';

const formatTime = (playTime) => {
  const duration = Duration.fromMillis(playTime);
  const minutes = Math.floor(duration.as('minutes'));
  const seconds = (playTime / 1000) % 60;

  let result = '';
  if (minutes > 0) {
    result += `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}, `;
  }
  result += `${seconds.toFixed(2)} ${seconds === 1 ? 'second' : 'seconds'}`;

  return result;
};

export { formatTime };
