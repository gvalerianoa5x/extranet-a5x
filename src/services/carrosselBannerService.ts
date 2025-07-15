import apiEsi from './apis/apiEsi';

export interface BannerItem {
  id: number;
  image: string; // base64
  backgroundImage: string; // base64
  title: string;
  description: string;
  buttonLabel: string;
  buttonLink: string;
  borderColors?: string[];
}

export const getBanners = async (): Promise<BannerItem[]> => {
  try {
    const { data } = await apiEsi.get('carrosselBanner/flows');

    return data.retorno;
  } catch (error) {
    console.error('Erro ao buscar banners:', error);
    throw error;
  }
};