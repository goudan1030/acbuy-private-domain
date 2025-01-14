import React from 'react';

const NoPriceDifference: React.FC = () => {
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
          src="/bag.webp"
          alt="No price difference on goods"
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
            className="absolute inset-0 bg-no-price"
            style={{
              width: '100%',
              height: '100%',
            }}
          />
          <h2 
            className="text-white text-[14px] lg:text-[20px] font-bold uppercase absolute left-0 right-0 z-20 flex items-center px-4"
            style={{
              fontFamily: 'Montserrat',
              top: '20%',
            }}
          >
            No price difference on goods
          </h2>
        </div>
      </div>

      <div 
        className="relative gradient-content mx-2"
        style={{
          borderRadius: '10px',
          background: 'linear-gradient(180deg, #FCC7A5 0%, #FFEBD9 36%, rgba(255, 255, 255, 0.9) 97%)',
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
                color: '#FE6A4F',
              }}
            >
              For the same price
            </h3>
            <p
              className="uppercase"
              style={{
                fontSize: '16px',
                fontWeight: 800,
                lineHeight: 'normal',
                color: '#FE6A4F',
              }}
            >
              you can buy 9 pieces on behalf of the buyer.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-square bg-gray-100 rounded-lg"></div>
            <div className="aspect-square bg-gray-100 rounded-lg"></div>
            <div className="aspect-square bg-gray-100 rounded-lg"></div>
            <div className="aspect-square bg-gray-100 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoPriceDifference; 