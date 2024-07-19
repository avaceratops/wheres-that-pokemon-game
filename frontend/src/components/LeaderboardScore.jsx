import { format } from 'date-fns';

export default function LeaderboardScore({ index, entry }) {
  const minutes = Math.floor(entry.score / 1000 / 60);

  if (minutes > 0) {
    return (
      <p>
        <span className="font-mono">{index + 1}:</span> {entry.name} (
        {format(entry.score, 'm:s:SS')})
      </p>
    );
  }

  return (
    <p>
      <span className="font-mono">{index + 1}:</span> {entry.name} ({format(entry.score, 's:SS')})
    </p>
  );
}
