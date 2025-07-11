import axios, { type InternalAxiosRequestConfig, type AxiosResponse, AxiosError } from 'axios';

const apiBase = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://a5x-dev.4biz.one/4biz/webmvc/',
});

// Variável para armazenar o token global
let globalAuthToken: string | null = null;

// Função para definir o token globalmente
export const setGlobalAuthToken = (token: string | null) => {
  globalAuthToken = token;
};

// Interceptor para adicionar token nas requisições
apiBase.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = globalAuthToken || localStorage.getItem('HYPER-AUTH-TOKEN');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Interceptor para lidar com erros de autenticação
apiBase.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.error('Token expirado ou inválido');
      // Aqui você pode disparar um evento para solicitar novo token
      window.dispatchEvent(new CustomEvent('authTokenExpired'));
    }
    return Promise.reject(error);
  }
);

export default apiBase;