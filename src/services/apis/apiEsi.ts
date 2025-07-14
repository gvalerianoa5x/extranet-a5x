import axios from 'axios';
import { useAuth } from '../../contexts/AuthProvider';

const apiEsi = axios.create({
  baseURL: 'https://a5x-dev.4biz.one/lowcode/integrations/',
});

apiEsi.interceptors.request.use(config => {
  const { token } = useAuth();
  const tokenAuth = token || localStorage.getItem('HYPER-AUTH-TOKEN'); // ou outro lugar que você armazena o token
  if (token) {
    config.headers.Authorization = `Bearer ${tokenAuth}`;
  }
  return config;
});

export default apiEsi;