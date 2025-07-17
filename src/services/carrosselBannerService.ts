import apiEsi from './apis/apiEsi';

export interface BannerItem {
  id: number;
  image: string; // base64
  backgroundimage: string; // base64
  title: string;
  description: string;
  buttonlabel: string;
  buttonlink: string;
  bordercolors?: string[];
}

export const getBanners = async (): Promise<BannerItem[]> => {
  try {
    const payload = {

    }
    const { data } = await apiEsi.post('carrosselBanner/flows', payload);

    return data.retorno;
  } catch (error) {
    console.error('Erro ao buscar banners:', error);
    throw error;
  }
};