import { useState, useRef, useEffect } from "react";
import TopNavigation from "@cloudscape-design/components/top-navigation";
import Input from "@cloudscape-design/components/input";
import Avatar from "@cloudscape-design/chat-components/avatar";
import { User, Star, Lock, LogOut } from "lucide-react";

interface TopbarProps {
  onClickTitle: () => void;
  titulo: string;
  envType:string;
}

function Topbar({ onClickTitle, titulo, envType }: TopbarProps) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const [selectEnv, setSelectEnv] = useState(envType);

  const handleChangeEnvironment = (env:string) =>{
    if(env === 'Ambiente de Produção'){
      setSelectEnv("Ambiente de Certificação")
    }else{
      setSelectEnv("Ambiente de Produção")
    }
}

  useEffect(() => {

    if (envType === "Produção"){
      setSelectEnv("Ambiente de Produção")
    }else if(envType === ""){
      setSelectEnv("")
    }else{
      setSelectEnv("Ambiente de Certificação")
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [envType]);

  useEffect(() => {
    const topNav = document.querySelector("header[class^='awsui_top-navigation_']") as HTMLElement;
    if (topNav) {
      topNav.style.background = selectEnv === "Ambiente de Certificação" ? "#00A4B7" : "#0C0052";
    }

    const inputEl = document.querySelectorAll('[class^="awsui_root"] > [class^="awsui_input_"]')[1] as HTMLElement;
    if (inputEl) {
      inputEl.style.background = selectEnv === "Ambiente de Certificação" ? "#33B6C5" : "#3D3375";
      inputEl.style.color = selectEnv === "Ambiente de Certificação" ? "white" : "white";
    }

     // Placeholder do input de busca
  const styleId = "custom-placeholder-style";
  let styleEl = document.getElementById(styleId) as HTMLStyleElement | null;

  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = styleId;
    document.head.appendChild(styleEl);
  }

  styleEl.innerHTML = selectEnv === "Ambiente de Certificação"
    ? `
      input::placeholder {
        color: #fff !important;
        opacity: 1;
      }

      input:focus {
        outline: none;
        opacity: 1;
      }
    `
    : `
      input::placeholder {
        color: #fff !important;
        opacity: 1;
      }
    `;
  }, [selectEnv]);

  return (
    <div className="relative z-50">
      <TopNavigation
        identity={{
          title: titulo,
          logo: {
            src: "/corretora.png",
            alt: "Logo da Corretora",
          },
          href: "#",
          onFollow: (e) => {
            e.preventDefault();
            onClickTitle();
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
            type: "menu-dropdown",
            text: selectEnv,
            items: [selectEnv == 'Ambiente de Certificação' ? 
              { id: "ambiente_producao", text: "Ambiente de Produção" } : 
              { id: "ambiente_certificacao", text: "Ambiente de Certificação" },
            ],
            onItemClick: () => {handleChangeEnvironment(selectEnv)}
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
            onChange={(_e) => console.log(_e.target)}
          />
        }
      />

      {userMenuOpen && (
        <div
          ref={userMenuRef}
          className="absolute top-[56px] right-4 w-64 rounded-xl border border-gray-200 shadow-xl backdrop-blur-md bg-white/40"
        >
          <div className="flex items-center gap-4 px-4 py-3 border-b border-gray-100">
            <Avatar ariaLabel="Avatar of John Doe" tooltipText="Usuario teste" />
            <div className="flex flex-col">
              <span className="font-semibold text-sm text-black">Usuario de teste</span>
              <span className="text-xs text-gray-500">A5X / Developer</span>
            </div>
          </div>

          <div className="flex flex-col py-1">
            <MenuItem icon={<User size={18} />} label="Minha conta" />
            <MenuItem icon={<Star size={18} />} label="Meus favoritos" />
            <MenuItem icon={<Lock size={18} />} label="Alterar senha" />
          </div>

          <hr className="my-1 border-gray-200" />

          <MenuItem icon={<LogOut size={18} />} label="Sair da ferramenta" />
        </div>
      )}
    </div>
  );
}

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
}

function MenuItem({ icon, label }: MenuItemProps) {
  const handleRedirectToSession = (redirectTo:string) =>{
    if(redirectTo === 'Sair da ferramenta'){
      window.location.href = "https://login-a5x.vercel.app/";
    }
  }
  return (
    <div
      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 cursor-pointer transition-colors"
      onClick={() => {handleRedirectToSession(label)}}
    >
      <span className="text-gray-600">{icon}</span>
      <span>{label}</span>
    </div>
  );
}

export default Topbar;
