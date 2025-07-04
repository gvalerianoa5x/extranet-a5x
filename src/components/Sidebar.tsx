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

// Tipagem do item de menu
type MenuItem = {
  text: string;
  href?: string;
  icon?: React.ReactNode;
  submenu?: MenuItem[];
};

interface SidebarProps {
  permissionRule : string;
}

// Tipagem dos tipos de menu ativos
type MenuType = "main-menu" | "submenu";

// Lista de itens
export const menuItens: MenuItem[] = [
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

const Sidebar = ({permissionRule}:SidebarProps) => {
  const [hoveredItem, setHoveredItem] = useState<MenuItem | null>(null);
  const [activeMenu, setActiveMenu] = useState<"main" | "submenu">("main");
  const [currentSubmenu, setCurrentSubmenu] = useState<MenuItem[]>([]);
  const [submenuTitle, setSubmenuTitle] = useState<string>("");
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleSubmenuClick = (parentItem: MenuItem) => {
    if (parentItem.submenu) {
      setCurrentSubmenu(parentItem.submenu);
      setSubmenuTitle(parentItem.text);
      setActiveMenu("submenu");
      setHoveredItem(null);
    }
  };

  const goBack = () => {
    setActiveMenu("main");
    setCurrentSubmenu([]);
    setSubmenuTitle("");
    window.location.hash = "#";
  };

  const resetMenu = (menuType: MenuType) => {
    setHoveredItem(null);
    if (menuType === "main-menu") setActiveMenu("main");
  };
  function seededRandom(seed: number): () => number {
    return function () {
      // Xorshift PRNG
      seed ^= seed << 13;
      seed ^= seed >> 17;
      seed ^= seed << 5;
      return Math.abs(seed) % 1000 / 1000;
    };
  }
  
  function getStableRandomMenu(menu: MenuItem[], permissionRule: string): MenuItem[] {
    if (permissionRule === "006") return menu;
  
    const rng = seededRandom(parseInt(permissionRule, 36)); // Stable seed
    const count = 1 + Math.floor(rng() * menu.length); // random between 1 and menu.length
  
    const indices = Array.from({ length: menu.length }, (_, i) => i);
  
    // Shuffle indices using the seeded random
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
  
    const selectedSet = new Set(indices.slice(0, count));
  
    // Return items in original order
    return menu.filter((_, i) => selectedSet.has(i));
  }

  const filteredMenu = getStableRandomMenu(menuItens, permissionRule);
  return (
    <div
      className="relative w-64 h-full bg-[#EDEDED] shadow z-10"
      ref={sidebarRef}
    >
      <ul className="py-2">
        {filteredMenu.map((item) => (
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

            {item.submenu && hoveredItem?.text === item.text && (
              <div className="absolute left-full top-0 w-56 bg-white border rounded shadow z-50">
                {item.submenu.map((sub) => (
                  <div
                    key={sub.text}
                    onClick={() => {
                      if (sub.href) {
                        handleSubmenuClick(item);
                        window.location.hash = sub.href;
                        resetMenu("submenu");
                      } else if (sub.submenu) {
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
