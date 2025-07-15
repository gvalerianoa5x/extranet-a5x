import React, { useState, useEffect } from 'react';
import './CarrosselBanner.css';
import { getBanners } from '../../../services/carrosselBannerService';
import type { BannerItem } from '../../../services/carrosselBannerService';
import { useAuth } from '../../../contexts/AuthProvider';

const CarrosselBanner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [banners, setBanners] = useState<BannerItem[]>([]);
  const { token, isLoading } = useAuth();
    
  useEffect(() => {
    if (isLoading || !token) return;

    const fetchBanners = async () => {
      try {
        const response = await getBanners();
        setBanners(response);
      } catch (error) {
        console.error('Erro ao carregar banners:', error);
        setBanners([]);
      }
    };

    fetchBanners();
  }, [isLoading, token]);

  // Funções de navegação do carrossel
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  // Retorna early se não há banners
  if (banners.length === 0) {
    return <div>Carregando...</div>;
  }

  const currentBanner = banners[currentIndex];
  
  // Função para converter base64 em URL válida se necessário
  const getImageUrl = (imageData: string) => {
    if (imageData.startsWith('data:')) {
      return imageData;
    }
    return `data:image/jpeg;base64,${imageData}`;
  };
  
  return (
    <div className="w-full mx-auto relative mb-8">
      <div className="flex items-center gap-4">
        {/* Banner principal */}
        <div className="relative w-full h-40 md:h-40 flex overflow-hidden rounded-lg flex-1">
          {/* Container principal com fundo */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-lg"
            style={{backgroundImage: `url(${getImageUrl(currentBanner.backgroundimage)})`}}
          />
          
          {/* Camadas empilhadas e inclinadas */}
          <div className="relative z-10 flex w-full">
            {/* Container das camadas inclinadas */}
            <div className="relative flex-shrink-0">
              {/* Camada azul mais clara (mais atrás) */}
              <div 
                className="absolute left-0 top-0 w-72 md:w-80 rounded-lg transform -rotate-[12deg] origin-bottom-left shadow-lg"
                style={{
                  backgroundColor: '#00D0FF',
                  left: '-4.0rem',
                  top: '-4.1rem',
                  height: '160%',
                  zIndex: 1
                }}
              />
              
              {/* Camada azul clara (segunda camada) */}
              <div 
                className="absolute left-0 top-0 w-72 md:w-80 rounded-lg transform -rotate-[15deg] origin-bottom-left shadow-lg"
                style={{
                  backgroundColor: '#008CFF',
                  left: '-3.9rem',
                  top: '-2.0rem',
                  height: '150%',
                  zIndex: 2
                }}
              />
              
              {/* Camada azul média (terceira camada) */}
              <div 
                className="absolute left-0 top-0 w-72 md:w-80 rounded-lg transform -rotate-[19deg] origin-bottom-left shadow-lg"
                style={{
                  backgroundColor: '#0538EB',
                  left: '-3.8rem',
                  top: '0.1rem',
                  height: '145%',
                  zIndex: 3
                }}
              />
              
              {/* Camada com imagem (frente) */}
              <div 
                className="absolute left-0 top-0 w-60 md:w-72 rounded-lg transform -rotate-[22.5deg] origin-bottom-left bg-cover bg-center shadow-lg"
                style={{
                  backgroundImage: `url(${getImageUrl(currentBanner.image)})`,
                  left: '-2.0rem',
                  top: '2.0rem',
                  height: '130%',
                  zIndex: 4
                }}
              />
              
              {/* Espaçador invisível para reservar espaço */}
              <div className="w-48 md:w-56 h-full"></div>
            </div>
            
            {/* Área de conteúdo principal - agora ao lado das camadas */}
            <div className="relative z-10 flex items-center flex-1 pl-12">
              {/* Conteúdo à esquerda - centralizado verticalmente */}
              <div className="relative z-20 text-white flex-1 pr-6">
                <h2 className="text-lg md:text-3xl font-bold mb-2 leading-tight text-left">
                  {currentBanner.title}
                </h2>
                <p className="text-sm md:text-base opacity-90 mb-4 md:mb-6 leading-relaxed text-left">
                  {currentBanner.description}
                </p>
              </div>
              
              {/* Botão à direita - sempre próximo da borda */}
              <div className="relative z-20 flex items-center justify-end pr-12 flex-shrink-0">
                <a 
                  href={currentBanner.buttonlink} 
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 md:py-3.5 px-8 md:px-12 rounded-full transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg text-sm md:text-base whitespace-nowrap"
                >
                  {currentBanner.buttonlabel}
                </a>
              </div>
            </div>
          </div>

        </div>
        
        {/* Área de navegação separada - ao lado do banner */}
        <div className="flex-shrink-0">
          <div 
            className="relative bg-cover bg-center rounded-lg p-10 shadow-lg h-40 w-30"
            style={{
              backgroundImage: `url(${getImageUrl(currentBanner.image)})`,
              filter: 'brightness(1.3) contrast(0.8)'
            }}
          >
            {/* Overlay semi-transparente */}
            <div className="absolute inset-0 bg-white/40 rounded-lg"></div>
            
            {/* Botões de navegação */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-3">
              <button 
                className="w-8 h-8 bg-black/90 hover:bg-black text-white rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110 shadow-md"
                onClick={prevSlide} 
                aria-label="Anterior"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                className="w-8 h-8 bg-black/90 hover:bg-black text-white rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110 shadow-md"
                onClick={nextSlide} 
                aria-label="Próximo"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarrosselBanner;