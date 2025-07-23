import apiEsi from './apis/apiEsi';

export interface AlertaItem {
  id: number;
  type: string;
  message: string;
}

export const getAlertas = async (): Promise<AlertaItem[]> => {
  try {
    const payload = {

    }
    const { data } = await apiEsi.post('alertasBolsa/flows', payload);
    return data.retorno.map((item: any) => ({
      id: item.id,
      type: item.tipo || item.type, 
      message: item.message
    }));
  } catch (error) {
    console.error('Erro ao buscar alertas:', error);
    throw error;
  }
};