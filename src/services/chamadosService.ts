import dataApi from './apis/apiBase';

export const getMyTickets = async () => {
  const { data } = await dataApi.get('v1/ticket/my-tickets');
  return data;
};