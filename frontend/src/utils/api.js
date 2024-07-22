import axios from 'axios';

const api = axios.create({
  baseURL: 'https://wheres-that-pokemon-game-production.up.railway.app/api',
});

export default api;
