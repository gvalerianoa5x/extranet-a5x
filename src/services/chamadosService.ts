import apiLowCode from './apis/apiLowcode';

export const getMyTickets = async () => {
  //const { data } = await dataApi.get('v1/ticket/my-tickets');
  const { data } = await apiLowCode.get('a5x/user');
  return data;
};