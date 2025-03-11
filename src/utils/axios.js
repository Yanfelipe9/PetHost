import axios from 'axios';

// Obtendo a URL do backend a partir do ambiente
const API_URL = process.env.NEXT_PUBLIC_BACK_URL || 'http://localhost:8080';

// Criando a instância do Axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptador para incluir Token JWT (se necessário)
api.interceptors.request.use(
  async (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


export default api;