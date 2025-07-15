let cachedToken: string | null = null;

export const getAuthToken = (): string | null => {
  if (cachedToken) return cachedToken;

  const token = localStorage.getItem('HYPER-AUTH-TOKEN');
  cachedToken = token;
  return token;
};

export const setAuthToken = (token: string) => {
  cachedToken = token;
  localStorage.setItem('HYPER-AUTH-TOKEN', token);
};

export const clearAuthToken = () => {
  cachedToken = null;
  localStorage.removeItem('HYPER-AUTH-TOKEN');
};