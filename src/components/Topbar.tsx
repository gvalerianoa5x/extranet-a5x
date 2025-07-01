import React, { useState, useRef, useEffect } from "react";
import TopNavigation from "@cloudscape-design/components/top-navigation";
import Input from "@cloudscape-design/components/input";
import Avatar from "@cloudscape-design/chat-components/avatar";
import {
  User,
  Star,
  Lock,
  LogOut,
} from "lucide-react";

const Topbar: React.FC = () => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative z-50">
      <TopNavigation
        identity={{
          title: (
            <div className="flex flex-row justify-between items-center">
              <Avatar
              ariaLabel="Avatar Corretora"
              imgUrl="/corretora.png"
              />
              <span
                onClick={() => console.log("Corretora")}
                className="text-sm ml-2"
              >
                Rico Investimentos ▼
              </span>
            </div>
          ),
          href: "#",
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
            type: "menu-dropdown",
            text: "Ambiente de produção",
            items: [
              { id: "ambiente_certificacao", text: "Ambiente de Certificação" },
            ],
          },
          {
            type: "button",
            iconName: "notification",
            title: "Notificações",
            ariaLabel: "Notificações (não lidas)",
            badge: true,
          },
          {
            type: "button",
            iconName: "user-profile",
            ariaLabel: "Abrir menu de perfil",
            onClick: () => setUserMenuOpen((prev) => !prev),
          },
        ]}
        search={
          <Input
            type="search"
            placeholder="Pesquise recursos, documentos, produtos e muito mais"
            ariaLabel="Buscar"
            value=""
          />
        }
      />

      {userMenuOpen && (
        <div
          ref={userMenuRef}
          className="absolute top-[56px] right-4 w-64 rounded-xl border border-gray-200 shadow-xl backdrop-blur-md bg-white/40"
        >
          {/* Header */}
          <div className="flex items-center gap-4 px-4 py-3 border-b border-gray-100">
            <Avatar
                ariaLabel="Avatar of John Doe"
                tooltipText="Usuario teste"
              />
            <div className="flex flex-col">
              <span className="font-semibold text-sm text-black">Usuario de teste</span>
              <span className="text-xs text-gray-500">A5X / Developer</span>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex flex-col py-1">
            <MenuItem icon={<User size={18} />} label="Minha conta" />
            <MenuItem icon={<Star size={18} />} label="Meus favoritos" />
            <MenuItem icon={<Lock size={18} />} label="Alterar senha" />
          </div>

          <hr className="my-1 border-gray-200" />

          {/* Logout */}
          <MenuItem icon={<LogOut size={18} />} label="Sair da ferramenta" />
        </div>
      )}
    </div>
  );
};

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label }) => (
  <div
    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 cursor-pointer transition-colors"
    onClick={() => console.log(label)}
  >
    <span className="text-gray-600">{icon}</span>
    <span>{label}</span>
  </div>
);

export default Topbar;
