import axios from 'axios';

const apiEsi = axios.create({
  baseURL: 'https://a5x-dev.4biz.one/lowcode/integrations/',
});

export default apiEsi;