import React from 'react';

const SEO = ({ 
  title = 'ABYSS - Deep Sea Exploration',
  description = 'ABYSS offers private deep-ocean expeditions with luxury submarines. Explore the unknown with expert-led marine adventures.',
  keywords = 'deep sea exploration, luxury submarine, private expedition, ocean adventure, ABYSS',
  image = '/logo.png',
  url = 'https://abyss-exploration.com',
  type = 'website',
  children 
}) => {
  const siteUrl = 'https://abyss-exploration.com';
  const fullUrl = url.startsWith('http') ? url : `${siteUrl}${url}`;
  const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`;

  return (
    <>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content="ABYSS Exploration" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {children}
    </>
  );
};

export default SEO;