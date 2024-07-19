import { useState } from 'react';
import api from '../utils/api';
import styles from '../styles/HighScoreForm.module.scss';

export default function HighScoreForm({ sessionId, setScoreAdded, updateScores }) {
  const [name, setName] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/leaderboard', { name, sessionId });
      if (response.status === 200) {
        setErrors([]);
        setName('');
        setScoreAdded(true);
        updateScores(name);
      }
    } catch (err) {
      setErrors(err.response.data.errors);
    }
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-start gap-4">
      <label htmlFor="name" className={styles.label}>
        Name
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </label>

      <button
        type="submit"
        className="rounded-md bg-blue-700 px-3 py-1.5 font-semibold text-white shadow-inner
          shadow-white/10 hover:bg-blue-600 focus:outline-none"
      >
        Submit
      </button>

      {errors.length > 0 && (
        <section>
          <ul className="list-inside list-disc text-red-500">
            {errors.map((error, index) => (
              <li key={index}>{error.msg}</li>
            ))}
          </ul>
        </section>
      )}
    </form>
  );
}
