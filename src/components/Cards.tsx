import React from 'react';
import Container from '@cloudscape-design/components/container';
import StatusIndicator from '@cloudscape-design/components/status-indicator';
import MeusChamados from './MeusChamados/MeusChamados';
import './Cards.css'; 

const Cards: React.FC = () => {
  return (
    <div className="w-full">      
      <div className="grid grid-cols-12 gap-4 w-full">        
        <div className="col-span-12 grid grid-cols-3 gap-4">
          {/* Card 1 */}
          <div className="h-full card-container">
            <Container header={<div>Title card</div>} className="h-full flex flex-col rounded-lg">
              <div className="flex-grow">
                <StatusIndicator type="info">
                  Figma ipsum component variant main layer.
                </StatusIndicator>
                <br />
                <StatusIndicator type="success">Status OK</StatusIndicator>
                <br />
                <StatusIndicator type="error">Status Error</StatusIndicator>
              </div>
            </Container>
          </div>

          {/* Card 2 */}
          <div className="h-full card-container">
            <Container header={<div>Title card</div>} className="h-full flex flex-col rounded-lg">
              <div className="flex-grow">
                <h4>Ativos <StatusIndicator type="success">Ativo</StatusIndicator></h4>
                <h4>Solicitações</h4>
                <ul>
                  <li>Em andamento <StatusIndicator type="pending"> </StatusIndicator></li>
                  <li>Em validação <StatusIndicator type="pending"> </StatusIndicator></li>
                  <li>Em liberação <StatusIndicator type="pending"> </StatusIndicator></li>
                </ul>
              </div>
            </Container>
          </div>

          {/* Card 3 */}
          <div className="h-full card-container">
            <Container header={<div>Title card</div>} className="h-full flex flex-col rounded-lg">
              <div className="flex-grow">
                <p>
                  Lorem ipsum dolor sit amet consectetur. Non eu sit ultricies tincidunt...
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur. Sociis vel pharetra proin...
                </p>
              </div>
            </Container>
          </div>
        </div>

        {/* Card Meus Chamados */}
        <div className="col-span-4 col-start-1 mt-4 card-container">
          <MeusChamados />
        </div>
      </div>
    </div>
  );
};

export default Cards;