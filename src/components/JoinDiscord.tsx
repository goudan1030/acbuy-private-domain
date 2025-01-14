import React from 'react';

const JoinDiscord: React.FC = () => {
  return (
    <div className="mt-4">
      <div 
        className="relative"
        style={{
          margin: '0 calc(-50vw + 50%)',
          width: '100vw',
        }}
      >
        <div 
          className="w-full"
          style={{ paddingTop: 'calc(136 / 375 * 100%)' }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'url(/join-discord-bg.svg)',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          />
          <h2 
            className="text-white text-[14px] font-bold uppercase absolute left-0 right-0 z-20 flex items-center px-4"
            style={{
              fontFamily: 'Montserrat',
              top: '10px',
            }}
          >
            Join to Discord
          </h2>
        </div>
      </div>

      <div 
        className="relative -mt-[110px] mx-2"
        style={{
          borderRadius: '10px',
          background: 'linear-gradient(180deg, #FFCADF 0%, #FFE2EB 36%, rgba(255, 255, 255, 0.9) 97%)',
          padding: '12px 0',
        }}
      >
        <div className="mx-2 bg-white rounded-lg p-4 shadow-sm">
          <div className="flex justify-center mb-4">
            <img 
              src="/discord.webp" 
              alt="Discord QR Code"
              className="w-48 h-48 object-contain rounded-lg"
            />
          </div>
          <p className="text-center text-black text-base">
            Get more great recommendations from bloggers
          </p>
        </div>
      </div>
    </div>
  );
};

export default JoinDiscord; 