import React, { useEffect } from 'react';

const GlobalTransportation: React.FC = () => {
  useEffect(() => {
    fetch('/global-transportation-bg.svg')
      .then(response => {
        if (!response.ok) {
          console.error('SVG 加载失败:', response.status, response.statusText);
        }
      })
      .catch(error => {
        console.error('SVG 加载错误:', error);
      });
  }, []);

  return (
    <div className="mt-4">
      <div 
        className="relative"
        style={{
          margin: '0 auto',
          maxWidth: '1200px',
          width: '100%',
        }}
      >
        <img 
          src="/global-transportation-icon.webp"
          alt="Global Transportation"
          className="absolute right-0 z-20 scale-50"
          style={{
            transformOrigin: 'top right',
            top: '10px',
          }}
        />

        <div 
          className="w-full h-[180px] lg:h-[220px]"
          style={{ 
            position: 'relative'
          }}
        >
          <div
            className="absolute inset-0 bg-transport"
            style={{
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              width: '100%',
              height: '100%',
            }}
            onError={(e) => {
              console.error('背景图片加载失败');
              const target = e.target as HTMLDivElement;
              target.style.backgroundColor = '#FF7C52';
            }}
          />
          <h2 
            className="text-white text-[14px] lg:text-[20px] font-bold uppercase absolute left-0 right-0 z-20 flex items-center px-4"
            style={{
              fontFamily: 'Montserrat',
              top: '20%',
            }}
          >
            Global transportation
          </h2>
        </div>
      </div>

      <div 
        className="relative gradient-content mx-2"
        style={{
          borderRadius: '10px',
          background: 'linear-gradient(180deg, #FFCADF 0%, #FFE2EB 36%, rgba(255, 255, 255, 0.9) 97%)',
          padding: '12px 0',
        }}
      >
        <div className="mx-2 bg-white rounded-lg p-4 shadow-sm">
          <div className="text-center mb-4">
            <h3 
              className="uppercase mb-2"
              style={{
                fontSize: '32px',
                fontWeight: 800,
                lineHeight: 'normal',
                color: '#4F58C5',
              }}
            >
              routes 200
            </h3>
            <p
              className="uppercase"
              style={{
                fontSize: '16px',
                fontWeight: 800,
                lineHeight: 'normal',
                color: '#4F58C5',
              }}
            >
              Up to 3 days
            </p>
          </div>
          <div className="flex justify-center">
            <img 
              src="/routes-map.webp" 
              alt="Global Routes Map"
              className="w-full lg:w-[366px] lg:h-[366px] object-contain rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalTransportation; 