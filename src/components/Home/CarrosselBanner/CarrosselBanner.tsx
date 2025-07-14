import React, { useState, useEffect } from 'react';
import './CarrosselBanner.css';
import defaultImage from '../../../assets/image_2.png';
import defaultBgImage from '../../../assets/bg-banner-01_.jpg';

interface BannerItem {
  id: number;
  imageUrl: string;
  backgroundImage: string;
  title: string;
  description: string;
  buttonLabel: string;
  buttonLink: string;
  borderColors?: string[];
}

const mockBanners: BannerItem[] = [
  {
    id: 1,
    imageUrl: defaultImage,
    backgroundImage: defaultBgImage,
    title: 'Figma ipsum component variant main layer',
    description: 'Lorem ipsum dolor sit amet consectetur. Vitae nisl blandit enim vivamus. Nullam felis tortor fermentum eget suspendisse suspendisse augue dolor.',
    buttonLabel: 'Conheça mais',
    buttonLink: '/action1',
    borderColors: ['#0066CC', '#0080FF', '#33A3FF']
  },
  {
    id: 2,
    imageUrl: defaultImage,
    backgroundImage: defaultBgImage,
    title: 'Novos recursos para investidores',
    description: 'Conheça as novas ferramentas de análise disponíveis para aprimorar suas decisões de investimento.',
    buttonLabel: 'Ver recursos',
    buttonLink: '/recursos',
    borderColors: ['#0066CC', '#0080FF', '#33A3FF']
  },
  {
    id: 3,
    imageUrl: defaultImage,
    backgroundImage: defaultBgImage,
    title: 'Prepare-se para o IPO',
    description: 'Informações exclusivas e análises detalhadas sobre as próximas ofertas públicas iniciais no mercado.',
    buttonLabel: 'Saiba mais',
    buttonLink: '/ipos',
    borderColors: ['#0066CC', '#0080FF', '#33A3FF']
  }
];

const CarrosselBanner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [banners, setBanners] = useState<BannerItem[]>([]);
    
  useEffect(() => {
    // Chamada API
    // const fetchBanners = async () => {
    //   const response = await fetch('/api/banners');
    //   const data = await response.json();
    //   setBanners(data);
    // };
    // fetchBanners();        
    setBanners(mockBanners);
  }, []);

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

  if (banners.length === 0) {
    return null;
  }

  const currentBanner = banners[currentIndex];
  
  return (
    <div className="w-full mx-auto relative mb-8">
      <div className="flex items-center gap-4">
        {/* Banner principal */}
        <div className="relative w-full h-40 md:h-40 flex overflow-hidden rounded-lg flex-1">
          {/* Container principal com fundo */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-lg"
            style={{backgroundImage: `url(${currentBanner.backgroundImage})`}}
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
                  backgroundImage: `url(${currentBanner.imageUrl})`,
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
                  href={currentBanner.buttonLink} 
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 md:py-3.5 px-8 md:px-12 rounded-full transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg text-sm md:text-base whitespace-nowrap"
                >
                  {currentBanner.buttonLabel}
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
              backgroundImage: `url(${currentBanner.imageUrl})`,
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