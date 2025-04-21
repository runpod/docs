// src/components/Card/index.js
import React from 'react';
import clsx from 'clsx';

// src/components/Card/index.js
const Card = ({
  className,
  style,
  children,
  shadow = false,
}) => {
  return (
    <div 
      className={clsx(
        'card',
        shadow && 'cardShadow', // Changed from 'card--shadow' to match our CSS
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
};

export default Card;