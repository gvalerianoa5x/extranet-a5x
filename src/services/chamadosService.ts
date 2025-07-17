//import dataApi from './apis/apiBase';
//import apiLowCode from './apis/apiLowcode';
import apiEsi from "./apis/apiEsi";

export const getMyTickets = async () => {
  const payload = {
    groupId : 2
  }
  const { data } = await apiEsi.post('meusChamados/flows', payload);
  return data.retorno;
};