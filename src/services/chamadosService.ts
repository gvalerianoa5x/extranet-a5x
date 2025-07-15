//import dataApi from './apis/apiBase';
//import apiLowCode from './apis/apiLowcode';
import apiEsi from "./apis/apiEsi";

export const getMyTickets = async () => {
  const payload = {
    
  }
  const { data } = await apiEsi.post('meusChamados/flows', payload);
  return data.retorno;
};