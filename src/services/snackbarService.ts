import apiEsi from './apis/apiEsi';

export interface SnackBarItem {
  action: string
  id: string
  type: string
  title: string
  message: string
  labelbutton: string
  url: string
}


export const getSnackBar = async (): Promise<SnackBarItem[]> => {
  try {
    const payload = {

    }
    const { data } = await apiEsi.post('snackbar/flows', payload);

    return data.retorno;
  } catch (error) {
    console.error('Erro ao buscar banners:', error);
    throw error;
  }
};