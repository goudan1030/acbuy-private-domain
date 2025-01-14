import React from 'react';
import { handleAcbuyNavigation } from '../utils/navigation';

const JoinAcbuy: React.FC = () => {
  const handleJoinClick = () => {
    handleAcbuyNavigation('/login?loginStatus=register');
  };

  return (
    <div 
      className="relative w-full flex items-center justify-center px-2 bg-join-acbuy-mobile lg:bg-none"
      style={{
        imageRendering: 'auto',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      <div 
        className="w-full max-w-[800px] lg:max-w-[1200px] mx-auto py-8 px-4 rounded-xl mt-48 relative z-10"
        style={{
          background: 'linear-gradient(180deg, rgba(255, 230, 192, 0.8) 0%, #FFF5ED 100%)',
          backdropFilter: 'blur(10px)',
          boxShadow: 'inset 0px 4px 20px 0px rgba(255, 255, 255, 0.6)',
        }}
      >
        <h2
          className="mb-6 text-center"
          style={{
            fontFamily: 'Montserrat',
            fontSize: '36px',
            fontWeight: 900,
            lineHeight: '78.5%',
            textTransform: 'uppercase',
            letterSpacing: '-0.05em',
            color: '#FF7018',
          }}
        >
          USE ACBUY TO SHOP<br />
          IN CHINA AT 10% OFF
        </h2>
        <button
          onClick={handleJoinClick}
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