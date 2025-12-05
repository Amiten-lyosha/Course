import React from 'react';
import { SubItem } from '../types';

interface CyberCardProps {
  item: SubItem;
  index: number;
}

export const CyberCard: React.FC<CyberCardProps> = ({ item, index }) => {
  const Icon = item.icon;

  return (
    <div className="group relative border border-zinc-800 bg-zinc-950/50 p-6 transition-all duration-300 hover:border-[#00ff41] hover:bg-zinc-900 overflow-hidden">
      {/* Corner decorations */}
      <div className="absolute -left-[1px] -top-[1px] h-2 w-2 bg-zinc-700 transition-colors group-hover:bg-[#00ff41]" />
      <div className="absolute -right-[1px] -top-[1px] h-2 w-2 bg-zinc-700 transition-colors group-hover:bg-[#00ff41]" />
      <div className="absolute -bottom-[1px] -left-[1px] h-2 w-2 bg-zinc-700 transition-colors group-hover:bg-[#00ff41]" />
      <div className="absolute -bottom-[1px] -right-[1px] h-2 w-2 bg-zinc-700 transition-colors group-hover:bg-[#00ff41]" />

      <div className="mb-4 flex items-center gap-3">
        {Icon && <Icon className="h-6 w-6 text-zinc-500 transition-colors group-hover:text-[#00ff41]" />}
        <h3 className="font-cyber text-xl font-bold text-[#00ff41] opacity-90">
          {item.title}
        </h3>
      </div>

      <div className="space-y-4">
        {item.description && (
          <p className="font-mono text-sm leading-relaxed text-zinc-400">
            {item.description}
          </p>
        )}
        
        {item.points && (
          <ul className="space-y-2">
            {item.points.map((point, i) => (
              <li key={i} className="flex gap-2 font-mono text-sm text-zinc-300">
                <span className="text-pink-500">{'>'}</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Hover visual noise */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,255,65,0.03)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </div>
  );
};
