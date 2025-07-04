import React from 'react';
import Container from '@cloudscape-design/components/container';
import StatusIndicator from '@cloudscape-design/components/status-indicator';

const Cards: React.FC = () => {
  return (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      {/* Card 1 */}
      <Container header={<div>Title card</div>}>
        <div>
          <StatusIndicator type="info">
            Figma ipsum component variant main layer.
          </StatusIndicator>
          <br />
          <StatusIndicator type="success">Status OK</StatusIndicator>
          <br />
          <StatusIndicator type="error">Status Error</StatusIndicator>
        </div>
      </Container>

      {/* Card 2 */}
      <Container header={<div>Title card</div>}>
        <div>
          <h4>Ativos <StatusIndicator type="success">Ativo</StatusIndicator></h4>
          <h4>Solicitações</h4>
          <ul>
            <li>Em andamento <StatusIndicator type="pending"> </StatusIndicator></li>
            <li>Em validação <StatusIndicator type="pending"> </StatusIndicator></li>
            <li>Em liberação <StatusIndicator type="pending"> </StatusIndicator></li>
          </ul>
        </div>
      </Container>

      {/* Card 3 */}
      <Container header={<div>Title card</div>}>
        <p>
          Lorem ipsum dolor sit amet consectetur. Non eu sit ultricies tincidunt...
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur. Sociis vel pharetra proin...
        </p>
      </Container>
    </div>
  );
};

export default Cards;
