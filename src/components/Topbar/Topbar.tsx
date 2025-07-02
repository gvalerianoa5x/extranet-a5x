import Input from "@cloudscape-design/components/input";
import TopNavigation from '@cloudscape-design/components/top-navigation';
import React from 'react';

const Topbar: React.FC = () => {
  return (
    <TopNavigation
      identity={{
        href: "#",
        title: "Rico Investimentos",
        logo: {
          src: "/logo.png",
          alt: "Logo",
        },
      }}
      i18nStrings={{
        searchIconAriaLabel: "Buscar",
        searchDismissIconAriaLabel: "Fechar busca",
        overflowMenuTriggerText: "Mais",
        overflowMenuTitleText: "Tudo",
        overflowMenuBackIconAriaLabel: "Voltar",
        overflowMenuDismissIconAriaLabel: "Fechar menu",
      }}
      utilities={[
        {
          type: "button",
          text: "Ambiente Produção",
          iconName: "status-positive",
          onClick: () => {},
        },
        {
          type: "menu-dropdown",
          iconName: "user-profile",
          description: "Usuário",
          items: [
            { id: "profile", text: "Perfil" },
            { id: "settings", text: "Configurações" },
            { id: "signout", text: "Sair" },
          ],
          onItemClick: item => console.log(item),
        },
      ]}
      search={
        <Input
          type="search"
          placeholder="Pesquise recursos, documentos, produtos e muito mais"
          ariaLabel="Search"
          value=""
        />
      }
    />
  );
};

export default Topbar;
