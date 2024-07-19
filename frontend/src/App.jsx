import { useEffect, useState } from 'react';
import api from './utils/api';
import ClickableImage from './components/ClickableImage';
import GameHeader from './components/GameHeader';
import Leaderboard from './components/Leaderboard';
import TaggingCircle from './components/TaggingCircle';
import TaggingOption from './components/TaggingOption';
import TaggingSelect from './components/TaggingSelect';
import WinMessage from './components/WinMessage';

export default function App() {
  const [tagCoords, setTagCoords] = useState(null);
  const [solved, setSolved] = useState({});
  const [playTime, setPlayTime] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [scores, setScores] = useState([]);

  const solvedCount = Object.keys(solved).length;

  // start client-side timer
  useEffect(() => {
    let id;
    if (startTime) {
      id = setInterval(() => {
        setPlayTime(Date.now() - startTime);
      }, 10);
    }
    return () => clearInterval(id);
  }, [startTime]);

  // stop server-side timer
  useEffect(() => {
    async function endSession() {
      try {
        const response = await api.post(`/session/${sessionId}`);
        if (response.status === 200 && response.data.session) {
          const { startTime, endTime } = response.data.session;
          setPlayTime(endTime - startTime);
          setStartTime(0);
        }
      } catch (err) {
        console.error(err);
      }
    }

    async function getScores() {
      try {
        const response = await api.get('/leaderboard');
        if (response.status === 200 && response.data) {
          setScores(response.data.scores);
        }
      } catch (err) {
        console.error(err);
      }
    }

    if (solvedCount === 3) {
      endSession();
      getScores();
    }
  }, [sessionId, solvedCount]);

  // get session id from server
  useEffect(() => {
    async function getSessionId() {
      try {
        const response = await api.post('/sessions');
        if (response.status === 200) {
          setSessionId(response.data.sessionId);
          setStartTime(response.data.startTime);
        }
      } catch (err) {
        console.error(err);
      }
    }
    if (solvedCount === 0) {
      getSessionId();
    }
  }, [solvedCount]);

  const tagImage = (e) => {
    // normalize co-ordinates across different screen sizes
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (!tagCoords) {
      setTagCoords({ x, y });
    } else {
      // clear selection on second click
      setTagCoords(null);
    }
  };

  const submitCoords = async (e) => {
    const { name } = e.target.dataset;

    try {
      const response = await api.post(`/coord/${name}`, tagCoords);

      // status 200 is only sent on correct guesses
      if (response.status === 200) {
        setSolved({ ...solved, [name]: true });
      }
    } catch (err) {
      console.error('Error guessing co-ordinates');
    } finally {
      setTagCoords(null);
    }
  };

  const updateScores = (name) => {
    const updatedScores = [...scores, { name, score: playTime }];

    updatedScores.sort((a, b) => a.score - b.score);
    // only keep the top 50 entries
    if (updatedScores.length > 50) {
      updatedScores.pop();
    }
    setScores(updatedScores);
  };

  const resetGame = () => {
    setSessionId(null);
    setSolved({});
  };

  return (
    <>
      <GameHeader solved={solved} playTime={playTime} />

      {/* spacer for fixed header */}
      <div className="mb-24 xs:mb-16" />

      {solvedCount === 3 && (
        <main className="p-4">
          <WinMessage playTime={playTime} resetGame={resetGame} />
          <hr className="my-4" />
          <Leaderboard
            playTime={playTime}
            sessionId={sessionId}
            numEntries={50}
            scores={scores}
            updateScores={updateScores}
          />
        </main>
      )}

      {solvedCount < 3 && (
        <main className="m-auto p-4">
          <section className="relative m-2">
            <ClickableImage
              src={'/montage.jpg'}
              alt="Clickable Pokemon montage"
              onClick={tagImage}
            />

            <TaggingCircle coords={tagCoords} />
            <TaggingSelect coords={tagCoords}>
              <TaggingOption name="Togepi" solved={solved} onClick={submitCoords} />
              <TaggingOption name="Omanyte" solved={solved} onClick={submitCoords} />
              <TaggingOption name="Bonsly" solved={solved} onClick={submitCoords} />
            </TaggingSelect>
          </section>
        </main>
      )}
    </>
  );
}
