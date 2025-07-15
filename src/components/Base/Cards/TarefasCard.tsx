import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

type Tarefa = {
  label: string;
  disabled: boolean;
  checked: boolean;
  children?: Tarefa[];
};

const tarefas: Record<string, Tarefa[]> = {
  'Certificação': [
    { label: 'Permissões', disabled: true, checked: true },
    {
      label: 'Solicitar sessões',
      disabled: false,
      checked: false,
      children: [
        { label: 'Solicitar sessão de negociação', disabled: true, checked: true },
        { label: 'Solicitar sessão de pós negociação', disabled: false, checked: false },
      ],
    },
    { label: 'Certificação negociação', disabled: true, checked: true },
    { label: 'Certificação pós negociação', disabled: false, checked: false },
    { label: 'Visualizar roteiro de testes', disabled: false, checked: false },
    { label: 'Executar certificação', disabled: false, checked: false },
    {
      label: 'task name',
      disabled: false,
      checked: false,
      children: [{ label: 'sub task', disabled: false, checked: false }],
    },
  ],
  'Produção': [
    { label: 'Solicitar infra de negociação', disabled: true, checked: true },
    { label: 'Solicitar infra de pós negociação', disabled: true, checked: true },
    { label: 'Solicitar sessão de negociação', disabled: true, checked: true },
    { label: 'Solicitar sessão de pós negociação', disabled: false, checked: true },
    { label: 'Revisar ambiente', disabled: false, checked: true },
    { label: 'Operar ativos de teste', disabled: false, checked: true },
  ]
};


interface TarefasCardProps {
  environmentType: keyof typeof tarefas;
}

const TarefaItem: React.FC<{ tarefa: Tarefa; level?: number }> = ({ tarefa, level = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = tarefa.children && tarefa.children.length > 0;

  const toggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <div className="flex flex-col gap-3">
      <div
        className={`flex items-center justify-between pr-2 ${
          tarefa.disabled ? 'text-gray-400 line-through' : 'text-gray-800'
        }`}
      >
        <div className={`flex items-center gap-2 pl-${level * 4}`}>
      <label className="relative cursor-pointer flex items-center gap-2 select-none">
        <input
          type="checkbox"
          disabled={tarefa.disabled}
          checked={tarefa.checked}
          readOnly
          className="peer sr-only"
        />
        <div
          className={`
            w-[13.33px] h-[13.33px] rounded-full border-2 flex items-center justify-center
            ${tarefa.disabled ? 'border-gray-400 bg-gray-300' : 'border-gray-600 bg-white'}
            peer-checked:bg-gray-500
            peer-checked:border-gray-500
            peer-disabled:opacity-60
            transition-all
          `}
        >
          {tarefa.checked && (
            <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </div>
          <span
            className={`
              font-normal 
              text-sm 
              leading-[100%] 
              tracking-[0%] 
              ${tarefa.disabled ? 'text-neutral-4 line-through' : 'text-neutral-6'}
              font-[Font-Family/Font-Family]
            `}
          >
            {tarefa.label}
          </span>
      </label>


        </div>

        {hasChildren && (
          <button onClick={toggleOpen} className="ml-auto">
            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
        )}
      </div>

      {hasChildren && isOpen && (
        <div className=" grid gap-3 p-4">
          {tarefa.children!.map((subTarefa, i) => (
            <TarefaItem key={i} tarefa={subTarefa} level={(level ?? 0) + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const TarefasCard: React.FC<TarefasCardProps> = ({ environmentType }) => {
  return (
    <div className="flex flex-col gap-2 text-sm pt-1">
      {tarefas[environmentType].map((tarefa, index) => (
        <TarefaItem key={index} tarefa={tarefa} />
      ))}
    </div>
  );
};

export default TarefasCard;
