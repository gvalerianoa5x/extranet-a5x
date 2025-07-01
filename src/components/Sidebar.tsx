import { useState, useRef } from "react";
import {
  LayoutDashboard,
  Users,
  Landmark,
  Building2,
  LineChart,
  ShieldCheck,
  BarChartHorizontal,
  Banknote,
  Wallet,
  FileBarChart2,
  Server,
  Settings,
  LifeBuoy,
  DollarSign,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";

export const menuItens = [
  {
    text: "Dashboards",
    icon: <LayoutDashboard size={16} />,
    href: "#dashboard",
  },
  {
    text: "Usuários & Permissões",
    icon: <Users size={16} />,
    href: "#usuarios",
  },
  { text: "Dados instituição", icon: <Landmark size={16} />, href: "#dados" },
  { text: "Contas e vínculos", icon: <Building2 size={16} />, href: "#contas" },
  { text: "Negociação", icon: <LineChart size={16} />, href: "#negociacao" },
  {
    text: "Riscos e garantias",
    icon: <ShieldCheck size={16} />,
    submenu: [
      { text: "Garantia 1", href: "#garantia-1" },
      { text: "Garantia 2", href: "#garantia-2" },
      { text: "Risco Institucional", href: "#risco-inst" },
    ],
  },
  {
    text: "Alocação e posição",
    icon: <BarChartHorizontal size={16} />,
    href: "#alocacao",
  },
  { text: "Liquidação", icon: <Banknote size={16} />, href: "#liquidacao" },
  { text: "Financeiro", icon: <Wallet size={16} />, href: "#financeiro" },
  { text: "Tarifação", icon: <FileBarChart2 size={16} />, href: "#tarifacao" },
  { text: "Conectividade e infra", icon: <Server size={16} />, href: "#infra" },
  { text: "Serviços", icon: <Settings size={16} />, href: "#servicos" },
  { text: "Suporte", icon: <LifeBuoy size={16} />, href: "#suporte" },
  {
    text: "Formador de mercado",
    icon: <DollarSign size={16} />,
    href: "#formador",
  },
];

const Sidebar = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [activeMenu, setActiveMenu] = useState<"main" | "submenu">("main");
  const [currentSubmenu, setCurrentSubmenu] = useState([]);
  const [submenuTitle, setSubmenuTitle] = useState("");
  const sidebarRef = useRef(null);
  
/* Caso precise que resete o menu ao interagir fora do menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setHoveredItem(null);
        setActiveMenu("main");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);*/

  const handleSubmenuClick = (parentItem) => {
    console.log(parentItem)
    setCurrentSubmenu(parentItem.submenu);
    setSubmenuTitle(parentItem.text);
    setActiveMenu("submenu");
    setHoveredItem(null);
  };

  const goBack = () => {
    setActiveMenu("main");
    setCurrentSubmenu([]);
    setSubmenuTitle("");
  };

  const resetMenu = (menuType) => {
    setHoveredItem(null);
    if(menuType == "main-menu")
      setActiveMenu("main");
  };

  return (
    <div
      className="relative w-64 h-full bg-[#EDEDED] shadow z-10"
      ref={sidebarRef}
    >
      <ul className="py-2">
        {menuItens.map((item) => (
          <li
            key={item.text}
            className="group relative"
            onMouseEnter={() => item.submenu && setHoveredItem(item)}
            onMouseLeave={() => item.submenu && setHoveredItem(null)}
          >
            <div
              onClick={() => {
                if (item.href) {
                  handleSubmenuClick(item);
                  window.location.hash = item.href;
                  resetMenu("main-menu");
                }
              }}
              className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {item.icon}
              <span className="ml-2 text-sm">{item.text}</span>
              {item.submenu && (
                <ChevronRight size={16} className="ml-auto opacity-50" />
              )}
            </div>

            {/* Flyout submenu */}
            {item.submenu && hoveredItem?.text === item.text && (
              <div className="absolute left-full top-0 w-56 bg-white border rounded shadow z-50">
                {item.submenu.map((sub) => (
                  <div
                    key={sub.text}
                    onClick={() => {
                      if (sub.href) {
                        handleSubmenuClick(item);
                        window.location.hash = sub.href;
                        resetMenu('submenu'); // fecha o submenu ao clicar
                      } else if (sub.submenu) {
                        window.location.hash = sub.href;
                        handleSubmenuClick(item);
                      }
                    }}
                    className="flex items-center justify-between px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 cursor-pointer"
                  >
                    {sub.text}
                    {sub.submenu && <ChevronRight size={16} />}
                  </div>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Slide-in submenu */}
      {activeMenu === "submenu" && (
        <div className="absolute top-0 left-0 w-full h-full bg-white transition-transform duration-300 z-40">
          <div className="p-4">
            <button
              onClick={goBack}
              className="flex items-center gap-1 text-gray-600 text-sm mb-4"
            >
              <ArrowLeft size={16} /> Voltar
            </button>
            <h3 className="text-md font-semibold mb-3">{submenuTitle}</h3>
            <ul>
              {currentSubmenu.map((item) => (
                <li key={item.text}>
                  <a
                    href={item.href}
                    className="block px-2 py-2 text-sm hover:bg-gray-100 rounded"
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
