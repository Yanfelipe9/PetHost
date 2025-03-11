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

// Interceptador para tratar erros globais
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.warn("Usuário não autenticado. Redirecionando para login...");
        localStorage.removeItem('token');
        window.location.href = "/login"; // Redireciona para página de login se não autenticado
      } else {
        console.error("Erro na API:", error.response.data);
      }
    } else {
      console.error("Erro de conexão:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;