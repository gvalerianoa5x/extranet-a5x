import axios from 'axios';
import { getAuthToken } from '../../utils/authTokenManager';

const apiEsi = axios.create({
  baseURL: 'https://a5x-dev.4biz.one/lowcode/integrations/',
});

apiEsi.interceptors.request.use(config => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log(config)
  return config;
});

export default apiEsi;