import axios from 'axios';

const API = 'http://localhost:4000/api';

export const updateProfile = async (data) => {
  const response = await axios.put(`${API}/profile`, data, {
    withCredentials: true,
  });
  return response.data;
};

export const getProfile = async () => {
  const response = await axios.get(`${API}/profile`, {
    withCredentials: true,
  });
  return response.data;
};

export const updateShipping = async (data) => {
  const response = await axios.put(`${API}/shipping`, data, {
    withCredentials: true,
  });
  return response.data;
};

export const deleteUser = async () => {
  const response = await axios.delete(`${API}/delete`, {
    withCredentials: true,
  });
  return response.data;
};
