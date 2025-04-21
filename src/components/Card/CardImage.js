// src/components/Card/CardImage.js
import React from 'react';
import clsx from 'clsx';
import useBaseUrl from '@docusaurus/useBaseUrl';

const CardImage = ({
  className,
  style,
  cardImageUrl,
  alt = '',
  title = '',
}) => {
  // Use Docusaurus utility to handle image URLs properly
  const generatedCardImageUrl = useBaseUrl(cardImageUrl);

  return (
    <img
      className={clsx('card__image', className)}
      style={style}
      src={generatedCardImageUrl}
      alt={alt}
      title={title}
    />
  );
};

export default CardImage;
