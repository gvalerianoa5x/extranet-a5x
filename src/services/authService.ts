import authApi from './apis/authApi';

export const login = async (username: string, password: string) => {
  const params = new URLSearchParams();
  params.append('grant_type', 'password');
  params.append('client_id', import.meta.env.VITE_CLIENT_ID);
  params.append('username', username);
  params.append('password', password);

  const { data } = await authApi.post('token', params);
  return data;
};