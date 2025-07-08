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
    <div className="carrossel-container">
      <div className="carrossel-wrapper">
        {/* Imagem da esquerda */}
        <div 
          className="carrossel-left-image"
          style={{backgroundImage: `url(${currentBanner.imageUrl})`}}
        />
        
        {/* Bordas coloridas */}
        <div className="carrossel-borders">
          {currentBanner.borderColors?.map((color, index) => (
            <div 
              key={index} 
              className="border-stripe" 
              style={{backgroundColor: color}}
            />
          ))}
        </div>
        
        {/* Área principal de conteúdo */}
        <div 
          className="carrossel-content-area"
          style={{backgroundImage: `url(${currentBanner.backgroundImage})`}}
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
                
        {/* Área de navegação com imagem de fundo */}
        <div 
          className="carrossel-nav-area"
          style={{backgroundImage: `url(${currentBanner.imageUrl})`}}
        >          
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