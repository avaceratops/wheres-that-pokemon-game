import { Duration } from 'luxon';

const formatTime = (playTime) => {
  const duration = Duration.fromObject({ seconds: playTime });
  const hours = Math.floor(duration.as('hours'));
  const minutes = Math.floor(duration.as('minutes')) % 60;
  const secs = Math.floor(playTime % 60);

  let result = '';
  if (hours > 0) {
    result += `${hours} ${hours === 1 ? 'hour' : 'hours'}, `;
  }
  if (minutes > 0) {
    result += `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}, `;
  }
  result += `${secs} ${secs === 1 ? 'second' : 'seconds'}`;

  return result;
};

export { formatTime };
