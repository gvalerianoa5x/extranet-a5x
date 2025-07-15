import axios from 'axios';

const apiEsi = axios.create({
  baseURL: 'https://a5x-dev.4biz.one/lowcode/integrations/',
});

apiEsi.interceptors.request.use(config => {
  const token = localStorage.getItem('HYPER-AUTH-TOKEN');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log('[API ESI]', config);
  return config;
});

export default apiEsi;