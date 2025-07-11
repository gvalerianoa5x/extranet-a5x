import axios from 'axios';

const authApi = axios.create({
  baseURL: 'https://keycloak.4biz.one/auth/realms/a5x-dev/protocol/openid-connect/',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

export default authApi;