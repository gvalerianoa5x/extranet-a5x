import { useState, useRef, useEffect } from "react";
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
import { setPageCount } from "../../../services/ultimasPaginasService";

// Tipagem do item de menu
type MenuItem = {
  text: string;
  href?: string;
  icon?: React.ReactNode;
  submenu?: MenuItem[];
  countsPerUser: number;
};

interface LinkProps {
  icon: React.ReactNode
  title: string;
  tag: string;
  active?: boolean;
  count: number;
}

interface SidebarProps {
  permissionRule: string;
  isCollapsed: boolean;
  pages : LinkProps[];
  onCountUpdated: () => void; 
}

// Tipagem dos tipos de menu ativos
type MenuType = "main-menu" | "submenu";

// Lista de itens
export const menuItens: MenuItem[] = [
  {
    text: "Dashboards",
    icon: <LayoutDashboard name="LayoutDashboard" size={16} />,
    href: "#dashboard",
    countsPerUser: 0
  },
  {
    text: "Usuários & Permissões",
    icon: <Users size={16} />,
    href: "#usuarios",
    countsPerUser: 0
  },
  { text: "Dados instituição", icon: <Landmark size={16} />, href: "#dados", countsPerUser: 0 },
  { text: "Contas e vínculos", icon: <Building2 size={16} />, href: "#contas", countsPerUser: 0 },
  { text: "Negociação", icon: <LineChart size={16} />, href: "#negociacao", countsPerUser: 0 },
  {
    text: "Riscos e garantias",
    icon: <ShieldCheck size={16} />,
    submenu: [
      { text: "Garantia 1", href: "#garantia-1", countsPerUser: 0 },
      { text: "Garantia 2", href: "#garantia-2", countsPerUser: 0},
      { text: "Risco Institucional", href: "#risco-inst", countsPerUser: 0},
    ],
    countsPerUser: 0
  },
  {
    text: "Alocação e posição",
    icon: <BarChartHorizontal size={16} />,
    href: "#alocacao",
    countsPerUser: 0
  },
  { text: "Liquidação", icon: <Banknote size={16} />, href: "#liquidacao", countsPerUser: 0 },
  { text: "Financeiro", icon: <Wallet size={16} />, href: "#financeiro", countsPerUser: 0 },
  { text: "Tarifação", icon: <FileBarChart2 size={16} />, href: "#tarifacao", countsPerUser: 0 },
  { text: "Conectividade e infra", icon: <Server size={16} />, href: "#infra", countsPerUser: 0 },
  { text: "Serviços", icon: <Settings size={16} />, href: "#servicos", countsPerUser: 0 },
  { text: "Suporte", icon: <LifeBuoy size={16} />, href: "#suporte", countsPerUser: 0 },
  {
    text: "Formador de mercado",
    icon: <DollarSign size={16} />,
    href: "#formador",
    countsPerUser: 0
  },
];

const Sidebar = ({ permissionRule, isCollapsed, pages, onCountUpdated }: SidebarProps) => {
  const [hoveredItem, setHoveredItem] = useState<MenuItem | null>(null);
  const [activeMenu, setActiveMenu] = useState<"main" | "submenu">("main");
  const [currentSubmenu, setCurrentSubmenu] = useState<MenuItem[]>([]);
  const [submenuTitle, setSubmenuTitle] = useState<string>("");
  const sidebarRef = useRef<HTMLDivElement>(null);

  //Atualiza contagem de paginas visitadas no menu
  useEffect(() => {
    for(let j = 0; j < pages.length; j++){
      for(let i=0; i < menuItens.length; i++){
        if(pages[j].tag == menuItens[i].text)
          menuItens[i].countsPerUser = pages[j].count
      }
    }
    console.log("a")
  }, [pages]);

  const handleSubmenuClick = async (parentItem: MenuItem) => {
    if (parentItem.submenu && !isCollapsed) {
      setCurrentSubmenu(parentItem.submenu);
      setSubmenuTitle(parentItem.text);
      setActiveMenu("submenu");
      setHoveredItem(null);
    }
    parentItem.countsPerUser++;
    const countPageUpdate = parentItem.countsPerUser;
    await setPageCount(parentItem, countPageUpdate);
    
    onCountUpdated();

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

  // Reset to main menu when collapsed
  if (isCollapsed && activeMenu === "submenu") {
    goBack();
  }

  return (
    <div
      className={`relative h-full bg-[#EDEDED] shadow z-10 transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
      ref={sidebarRef}
    >
      <ul className="py-2">
        {filteredMenu.map((item) => (
          <li
            key={item.text}
            className="group relative"
            onMouseEnter={() => item.submenu && !isCollapsed && setHoveredItem(item)}
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
              {!isCollapsed && (
                <>
                  <span className="ml-2 text-sm">{item.text}</span>
                  {item.submenu && (
                    <ChevronRight size={16} className="ml-auto opacity-50" />
                  )}
                </>
              )}
            </div>

            {item.submenu && hoveredItem?.text === item.text && !isCollapsed && (
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

      {activeMenu === "submenu" && !isCollapsed && (
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