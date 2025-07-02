import React from 'react';
import Container from '@cloudscape-design/components/container';
import Button from '@cloudscape-design/components/button';

const HeaderBanner: React.FC = () => {
  return (
    <Container
      header={<div style={{ fontWeight: 'bold' }}>Header message</div>}
      footer={<Button variant="link">Label button</Button>}
    >
      <div style={{
        backgroundColor: '#0F1B2A',
        color: 'white',
        borderRadius: '8px',
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h3>Figma ipsum component variant main layer. Device.</h3>
          <p>
            Figma ipsum component variant main layer. Pencil auto undo overflow arrow main.
          </p>
        </div>
        <Button variant="primary">Call to action</Button>
      </div>
    </Container>
  );
};

export default HeaderBanner;
