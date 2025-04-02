import axios from 'axios';
import { message } from 'antd';

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

api.interceptors.response.use(
  (response) => response, 
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
    
      localStorage.clear();
  
      if (typeof window !== 'undefined') {
        window.location.href = '/signin';
      }
    }
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    // Redirecionamento no caso de 401/403
    if (status === 401 || status === 403) {
      localStorage.clear();
      if (typeof window !== 'undefined') {
        window.location.href = '/signin';
      }
    }

    // Exibe mensagem de erro global
    const errorMsg =
    error.response?.data?.message ||
      error.response?.data?.error ||
      'Ocorreu um erro inesperado.';

    message.error(errorMsg, 5); // 5 segundos de duração

    return Promise.reject(error);
  }
);


export default api;