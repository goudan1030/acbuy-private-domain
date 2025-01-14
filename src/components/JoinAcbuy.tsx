import React from 'react';

const JoinAcbuy: React.FC = () => {
  return (
    <div 
      className="relative w-full flex items-center justify-center px-2"
      style={{
        backgroundImage: 'url(/join-acbuy-bg.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div 
        className="w-full max-w-[800px] mx-auto p-8 rounded-xl mt-48"
        style={{
          background: 'linear-gradient(180deg, rgba(255, 230, 192, 0.8) 0%, #FFF5ED 100%)',
          backdropFilter: 'blur(10px)',
          boxShadow: 'inset 0px 4px 20px 0px rgba(255, 255, 255, 0.6)',
        }}
      >
        <h2
          className="mb-6 text-center"
          style={{
            opacity: 1,
            fontFamily: 'Montserrat',
            fontSize: '28px',
            fontWeight: 900,
            lineHeight: '78.5%',
            textTransform: 'uppercase',
            letterSpacing: '-0.05em',
            fontVariationSettings: '"opsz" auto',
            fontFeatureSettings: '"kern" on',
            background: 'linear-gradient(180deg, #FEFEFC 0%, #FBD9B0 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            boxShadow: '0px 27px 19px 0px rgba(238, 68, 34, 0.01)',
          }}
        >
          USE ACBUY TO SHOP<br />
          IN CHINA AT 10% OFF
        </h2>
        <button
          className="block w-full px-8 py-3 transition-colors"
          style={{
            opacity: 1,
            fontFamily: 'Montserrat',
            fontSize: '24px',
            fontWeight: 900,
            lineHeight: 'normal',
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: '0em',
            fontVariationSettings: '"opsz" auto',
            fontFeatureSettings: '"kern" on',
            color: '#FFFFFF',
            borderRadius: '227px',
            background: '#FF0000',
            boxSizing: 'border-box',
            border: '2px solid #FBDAAC',
            boxShadow: '0px 4px 10px 0px #FAA87E, 0px 5px 15px 0px rgba(255, 0, 0, 0.35), inset 0px -4px 10px 0px rgba(255, 255, 255, 0.6), inset 0px 4px 10px 0px rgba(255, 255, 255, 0.6)',
          }}
        >
          JOIN NOW
        </button>
      </div>
    </div>
  );
};

export default JoinAcbuy; 