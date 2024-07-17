import { useEffect, useState } from 'react';
import api from './utils/api';
import { formatTime } from './utils/timer';
import ClickableImage from './components/ClickableImage';
import GameHeader from './components/GameHeader';
import Modal from './components/Modal';
import TaggingCircle from './components/TaggingCircle';
import TaggingOption from './components/TaggingOption';
import TaggingSelect from './components/TaggingSelect';

export default function App() {
  const [tagCoords, setTagCoords] = useState(null);
  const [solved, setSolved] = useState({});
  const [playTime, setPlayTime] = useState(0);
  const [sessionId, setSessionId] = useState(null);

  const solvedCount = Object.keys(solved).length;

  // start client-side timer
  useEffect(() => {
    const id = setInterval(() => {
      if (solvedCount < 3) {
        setPlayTime((prevTime) => prevTime + 1);
      } else {
        clearInterval(id);
      }
    }, 1000);
    return () => clearInterval(id);
  }, [solvedCount]);

  // get session id from server
  useEffect(() => {
    async function getSessionId() {
      try {
        const response = await api.post('/sessions');
        if (response.status === 200) {
          setSessionId(response.data.sessionId);
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

  const resetGame = () => {
    setSolved({});
    setPlayTime(0);
  };

  return (
    <>
      <GameHeader solved={solved} playTime={playTime} />
      <Modal
        isOpen={solvedCount === 3}
        title="You beat the game!"
        desc={`It took you ${formatTime(playTime)}.`}
        buttonText="Restart"
        onClick={resetGame}
      />

      {/* spacer for fixed header */}
      <div className="mb-24 xs:mb-16" />

      <main className="m-auto">
        <section className="relative m-2">
          <ClickableImage src={'/montage.jpg'} alt="Clickable Pokemon montage" onClick={tagImage} />

          <TaggingCircle coords={tagCoords} />
          <TaggingSelect coords={tagCoords}>
            <TaggingOption name="Togepi" solved={solved} onClick={submitCoords} />
            <TaggingOption name="Omanyte" solved={solved} onClick={submitCoords} />
            <TaggingOption name="Bonsly" solved={solved} onClick={submitCoords} />
          </TaggingSelect>
        </section>
      </main>
    </>
  );
}
