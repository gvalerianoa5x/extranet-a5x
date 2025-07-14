import apiLowCode from './apis/apiLowcode';
import dataApi from './apis/apiBase';

export const getMyTickets = async () => {
  //const { data } = await dataApi.get('v1/ticket/my-tickets');
  //const { data } = await dataApi.get('servicerequestincident/search');
  //const { data } = await apiLowCode.get('a5x/user');
const { data } = await dataApi.get('servicerequestincident/search');
  return data;
};