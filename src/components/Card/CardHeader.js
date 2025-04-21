// src/components/Card/CardHeader.js
import React from 'react';
import clsx from 'clsx';

const CardHeader = ({
  className,
  style,
  children,
  textAlign = 'left',
  variant,
  transform,
  breakWord = false,
  truncate = false,
  weight,
}) => {
  // Generate class names based on props
  const textAlignClass = textAlign ? `text--${textAlign}` : '';
  const textVariantClass = variant ? `text--${variant}` : '';
  const textTransformClass = transform ? `text--${transform}` : '';
  const textBreakClass = breakWord ? 'text--break-word' : '';
  const textTruncateClass = truncate ? 'text--truncate' : '';
  const textWeightClass = weight ? `text--${weight.toLowerCase()}` : '';

  return (
    <div
      className={clsx(
        'card__header',
        className,
        textAlignClass,
        textVariantClass,
        textTransformClass,
        textBreakClass,
        textTruncateClass,
        textWeightClass
      )}
      style={style}
    >
      {children}
    </div>
  );
};

export default CardHeader;
