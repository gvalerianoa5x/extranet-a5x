import axios from 'axios';

const apiEsi = axios.create({
  //https://a5x-dev.4biz.one/lowcode/integrations/{nome_do_esi}/flows
  baseURL: 'https://a5x-dev.4biz.one/lowcode/integrations/',
});

apiEsi.interceptors.request.use(config => {
  const token = localStorage.getItem('HYPER-AUTH-TOKEN');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiEsi;