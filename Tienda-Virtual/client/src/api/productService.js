import axios from 'axios';

const API = 'http://localhost:4000/api';

const axiosInstance = axios.create({
  baseURL: API,
  withCredentials: true, // Asegúrate de que withCredentials está habilitado
});

export const createProduct = async (data) => {
  const response = await axiosInstance.post('/products', data);
  return response.data;
};

export const updateProduct = async (id, data) => {
  const response = await axiosInstance.put(`/products/${id}`, data);
  return response.data;
};

export const getProductById = async (id) => {
  const response = await axiosInstance.get(`/products/${id}`);
  return response.data;
};

export const getProducts = async () => {
  const response = await axiosInstance.get('/products');
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axiosInstance.delete(`/products/${id}`);
  return response.data;
};
