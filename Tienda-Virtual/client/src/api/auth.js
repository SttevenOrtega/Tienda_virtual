import axios from 'axios';

const API = 'http://localhost:4000/api';

export const registerRequest = async (user) => {
  return await axios.post(`${API}/register`, user, { withCredentials: true });
};

export const loginRequest = async (user) => {
  return await axios.post(`${API}/login`, user, { withCredentials: true });
};

export const logoutRequest = async () => {
  return await axios.post(`${API}/logout`, {}, { withCredentials: true });
};
