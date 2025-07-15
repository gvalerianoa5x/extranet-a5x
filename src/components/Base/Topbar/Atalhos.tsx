import React from "react";
import { Truck } from "lucide-react";

interface Shortcut {
  id: string;
  name: string;
  icon: string | React.ReactNode;
  url: string;
}

const atalhosFixos: Shortcut[] = [
  {
    id: "1",
    name: "Short link",
    icon: <Truck size={16} />,
    url: "/dashboard",
  },
  {
    id: "2",
    name: "Short link",
    icon: <Truck size={16} />,
    url: "/relatorios",
  },
  {
    id: "3",
    name: "Short link",
    icon: <Truck size={16} />,
    url: "/usuarios",
  },
  {
    id: "4",
    name: "Short link",
    icon: <Truck size={16} />,
    url: "/configuracoes",
  },
];

const Atalhos: React.FC = () => {
  return (
    <div className="atalhos-wrapper">
      <div className="atalhos-container">
        <div className="atalhos-header">
          <div className="atalhos-list">
            {atalhosFixos.map((s) => (
              <a key={s.id} href={s.url} className="atalho-item">
                <div className="atalho-icon-wrapper">
                  {typeof s.icon === "string" ? (
                    <img src={s.icon} alt={s.name} className="atalho-icon" />
                  ) : (
                    s.icon
                  )}
                </div>
                <div className="atalho-label">{s.name}</div>
              </a>
            ))}
          </div>
          <button className="adicionar-atalho">Adicionar atalho</button>
        </div>
      </div>

      <style>{`
        .atalhos-wrapper {
          width: 100%;
          border-bottom: 1px solid #0000000D;
          background-color: #EDEDED;
          display: flex;
          justify-content: center;
        }

        .atalhos-container {
          width: 1146px;
          height: 44px;
          display: flex;
          align-items: center;
          padding: 0 16px;
          box-sizing: border-box;
        }

        .atalhos-header {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .atalhos-list {
          display: flex;
          gap: 20px;
          margin-top: -14px;
          margin-left: -51px;
        }

        .atalho-item {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          color: black;
          font-size: 14px;
          padding: 4px 8px;
          border-radius: 6px;
          transition: background 0.2s ease;
        }

        .atalho-item:hover {
          background-color: #e2e8f0;
        }

        .atalho-icon-wrapper {
          width: 36px;
          height: 36px;
          background-color: #e8f0fe;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .atalho-icon {
          width: 20px;
          height: 20px;
        }

        .atalho-label {
          font-family: 'Font-Family', sans-serif;
          font-weight: 400;
          font-style: normal;
          font-size: 12px;
          line-height: 120%;
          letter-spacing: 0;
          white-space: nowrap;
        }

        .adicionar-atalho {
          background: none;
          border: none;
          color: rgba(3, 59, 255, 1);
          text-decoration: underline;
          cursor: pointer;
          font-size: 14px;
          white-space: nowrap;
          padding: 0;
          font-family: inherit;
          margin-top: -20px;
        }

        .adicionar-atalho:hover {
          text-decoration: none;
        }
      `}</style>
    </div>
  );
};

export default Atalhos;
