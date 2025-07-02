import React, { useState, useEffect } from 'react';
import './CarrosselBanner.css';

interface BannerItem {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  buttonLabel: string;
  buttonLink: string;
}

// Dados mockados
const mockBanners: BannerItem[] = [
  {
    id: 1,
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1470&auto=format&fit=crop',
    title: 'Figma ipsum component variant main layer',
    description: 'Lorem ipsum dolor sit amet consectetur. Vitae nisl blandit enim vivamus. Nullam felis tortor fermentum eget suspendisse suspendisse augue dolor.',
    buttonLabel: 'Conheça mais',
    buttonLink: '/action1'
  },
  {
    id: 2,
    imageUrl: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?q=80&w=1073&auto=format&fit=crop',
    title: 'Novos recursos para investidores',
    description: 'Conheça as novas ferramentas de análise disponíveis para aprimorar suas decisões de investimento.',
    buttonLabel: 'Ver recursos',
    buttonLink: '/recursos'
  },
  {
    id: 3,
    imageUrl: 'https://images.unsplash.com/photo-1639322537504-6427a16b0a28?q=80&w=1032&auto=format&fit=crop',
    title: 'Prepare-se para o IPO',
    description: 'Informações exclusivas e análises detalhadas sobre as próximas ofertas públicas iniciais no mercado.',
    buttonLabel: 'Saiba mais',
    buttonLink: '/ipos'
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
    
    // Dados mockados
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
    <div className="carrossel-container">
      <div className="carrossel-wrapper">
        {/* Área principal com conteúdo e overlay gradiente */}
        <div 
          className="carrossel-content-area"
          style={{backgroundImage: `url(${currentBanner.imageUrl})`}}
        >
          <div className="carrossel-overlay">
            <div className="carrossel-content">
              <h2 className="carrossel-title">{currentBanner.title}</h2>
              <p className="carrossel-description">{currentBanner.description}</p>
            </div>
            
            <div className="carrossel-button-container">
              <a href={currentBanner.buttonLink} className="carrossel-button">
                {currentBanner.buttonLabel}
              </a>
            </div>
          </div>
        </div>
        
        {/* Área clara à direita com os botões de navegação */}
        <div 
          className="carrossel-nav-area"
          style={{backgroundImage: `url(${currentBanner.imageUrl})`}}
        >
          {/* Botões de navegação */}
          <button className="nav-button prev" onClick={prevSlide} aria-label="Anterior">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="nav-button next" onClick={nextSlide} aria-label="Próximo">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarrosselBanner;