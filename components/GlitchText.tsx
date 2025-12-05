import React from 'react';

interface GlitchTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  className?: string;
}

export const GlitchText: React.FC<GlitchTextProps> = ({ text, as: Component = 'span', className = '' }) => {
  return (
    <Component className={`glitch-text ${className}`} data-text={text}>
      {text}
    </Component>
  );
};
