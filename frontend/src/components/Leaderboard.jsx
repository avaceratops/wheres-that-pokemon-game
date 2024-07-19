import { useState } from 'react';
import HighScoreForm from './HighScoreForm';
import LeaderboardScore from './LeaderboardScore';

export default function Leaderboard({ playTime, sessionId, numEntries, scores, updateScores }) {
  const [scoreAdded, setScoreAdded] = useState(false);

  const newHighScore = scores.length < 50 || playTime < scores[scores.length - 1].score;

  return (
    <section>
      {newHighScore && !scoreAdded && (
        <>
          <p className="mb-2">New high score! Enter your name to add it to the leaderboard.</p>
          <HighScoreForm
            sessionId={sessionId}
            setScoreAdded={setScoreAdded}
            updateScores={updateScores}
          />
          <hr className="my-4" />
        </>
      )}

      <h2 className="mb-2 text-xl font-semibold">Leaderboard - Top {numEntries}</h2>
      <ul role="list">
        {scores.map((entry, index) => (
          <LeaderboardScore key={index} index={index} entry={entry} />
        ))}
      </ul>
    </section>
  );
}
