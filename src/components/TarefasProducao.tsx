import React from 'react';
import { CircleDot } from 'lucide-react';

const tarefas = [
  { label: 'Solicitar infra de negociação', disabled: true },
  { label: 'Solicitar infra de pós negociação', disabled: true },
  { label: 'Solicitar sessão de negociação', disabled: true },
  { label: 'Solicitar sessão de pós negociação', disabled: false },
  { label: 'Revisar ambiente', disabled: false },
  { label: 'Operar ativos de teste', disabled: false },
];

const TarefasProducao: React.FC = () => {
  return (
    <div className="flex flex-col gap-2 text-sm pt-1">
      {tarefas.map((tarefa, index) => (
        <div
          key={index}
          className={`flex items-start gap-2 ${
            tarefa.disabled ? 'text-gray-400 line-through' : 'text-gray-800'
          }`}
        >
          <CircleDot size={14} className="mt-[2px]" />
          <span>{tarefa.label}</span>
        </div>
      ))}
    </div>
  );
};

export default TarefasProducao;
