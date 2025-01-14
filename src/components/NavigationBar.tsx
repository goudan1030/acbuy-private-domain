import React from 'react';

interface NavigationBarProps {
  isDownloadVisible: boolean;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ isDownloadVisible }) => {
  const getJoinLink = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    return isMobile ? 'https://m.acbuy.com/login' : 'https://www.acbuy.com/login';
  };

  return (
    <div
      className="w-full"
      style={{
        background: '#FF0000',
        boxShadow: '0px 5px 15px 0px rgba(255, 0, 0, 0.35), inset 0px -4px 10px 0px rgba(255, 255, 255, 0.6), inset 0px 4px 10px 0px rgba(255, 255, 255, 0.6)',
      }}
    >
      <div
        className="flex justify-between items-center mx-auto"
        style={{
          height: '50px',
          maxWidth: '1200px',
          padding: '0 16px',
        }}
      >
        {/* Logo */}
        <a href="/" className="text-white">
          <img src="/svg-menu.svg" alt="Logo" className="h-10" />
        </a>

        {/* 按钮组 */}
        <div className="flex items-center gap-6">
          {/* Login 按钮 */}
          <a 
            href="/login"
            className="text-white hover:text-gray-200 transition-colors"
            style={{ fontSize: '16px' }}
          >
            Login
          </a>

          {/* Join 按钮 */}
          <a 
            href={getJoinLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white rounded hover:bg-gray-700"
            style={{
              height: '32px',
              lineHeight: '32px',
              padding: '0 16px',
            }}
          >
            Join
          </a>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;