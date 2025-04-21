// src/components/Card/CardFooter.js
import React from 'react';
import clsx from 'clsx';

const CardFooter = ({
  className,
  style,
  children,
  textAlign = 'left',
  variant,
  transform,
  breakWord = false,
  truncate = false,
  weight,
  italic = false,
  decoration,
}) => {
  // Generate class names based on props
  const textAlignClass = textAlign ? `text--${textAlign}` : '';
  const textVariantClass = variant ? `text--${variant}` : '';
  const textTransformClass = transform ? `text--${transform}` : '';
  const textBreakClass = breakWord ? 'text--break-word' : '';
  const textTruncateClass = truncate ? 'text--truncate' : '';
  const textWeightClass = weight ? `text--${weight.toLowerCase()}` : '';
  const textItalic = italic ? 'text--italic' : '';
  const textDecoration = decoration ? `text--${decoration}` : '';

  return (
    <div
      className={clsx(
        'card__footer',
        className,
        textAlignClass,
        textVariantClass,
        textTransformClass,
        textBreakClass,
        textTruncateClass,
        textWeightClass,
        textItalic,
        textDecoration
      )}
      style={style}
    >
      {children}
    </div>
  );
};

export default CardFooter;
