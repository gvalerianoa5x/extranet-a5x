import axios from 'axios';

const apiLowcode = axios.create({
  baseURL: 'https://a5x-dev.4biz.one/lowcode/data/',
});

export default apiLowcode;