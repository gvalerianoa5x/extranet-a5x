import React from 'react';
import SideNavigation from '@cloudscape-design/components/side-navigation';

const Sidebar: React.FC = () => {
  return (
    <SideNavigation
      header={{ text: 'Dashboards', href: '#' }}
      items={[
        { type: 'link', text: 'Usuários & Permissões', href: '#usuarios' },
        { type: 'link', text: 'Dados Instituição', href: '#dados' },
        { type: 'link', text: 'Contas e vínculos', href: '#contas' },
        { type: 'link', text: 'Negociação', href: '#negociacao' },
        { type: 'link', text: 'Riscos e garantias', href: '#riscos' },
        { type: 'link', text: 'Alocação e posição', href: '#alocacao' },
        { type: 'link', text: 'Liquidação', href: '#liquidacao' },
        { type: 'link', text: 'Financeiro', href: '#financeiro' },
        { type: 'link', text: 'Tarifação', href: '#tarifacao' },
        { type: 'link', text: 'Conectividade e Infra', href: '#infra' },
        { type: 'link', text: 'Suporte', href: '#suporte' },
        { type: 'link', text: 'Formador de mercado', href: '#formador' },
      ]}
    />
  );
};

export default Sidebar;
