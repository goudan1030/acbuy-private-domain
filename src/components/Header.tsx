import React, { useState, useEffect } from 'react';
import NavigationBar from './NavigationBar';
import { getAppDownloadUrl } from '../services/appDownloadService';

const Header: React.FC = () => {
  const [isDownloadVisible, setIsDownloadVisible] = useState(true);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchDownloadUrl = async () => {
      const url = await getAppDownloadUrl();
      console.log('Fetched download URL:', url);
      setDownloadUrl(url);
    };

    fetchDownloadUrl();
  }, []);

  const handleDownloadClose = () => {
    setIsDownloadVisible(false);
  };

  const handleGetClick = () => {
    console.log('Current download URL:', downloadUrl);
    console.log('Current user agent:', navigator.userAgent);
    
    if (downloadUrl) {
      window.open(downloadUrl, '_blank', 'noopener,noreferrer');
    } else {
      console.log('No download URL available');
    }
  };

  return (
    <header className="bg-white shadow-md">
      {isDownloadVisible && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md z-50 md:top-auto md:bottom-0">
          <div
            className="flex justify-between items-center"
            style={{ padding: '0 10px  0 10px', minHeight: '80px', maxWidth: '1200px', margin: '0 auto' }}
          >
            <button onClick={handleDownloadClose} style={{ marginLeft: '0.25rem' }} className="md:hidden">
              <img src="/close.svg" alt="Close" className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1 px-1 md:pl-0">
              <img src="/logo.svg" alt="App Logo" style={{ width: '56px', height: '56px' }} />
              <div className="flex-shrink">
                <h2
                  className="font-bold text-black uppercase whitespace-nowrap overflow-hidden overflow-ellipsis"
                  style={{ fontSize: '12px' }}
                >
                  ACBUY - Shop Like A Millionaire
                </h2>
                <p className="text-xs text-gray-600 uppercase">¥1000 COUPON FOR NEW USERS</p>
                <div className="flex items-center text-yellow-500">
                  <span>★★★★★</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={handleGetClick}
                className="text-black font-bold border border-black px-4 py-2 rounded"
              >
                GET
              </button>
              <button
                onClick={handleDownloadClose}
                className="text-black font-bold border border-black px-4 py-2 rounded hidden md:block"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
      <NavigationBar isDownloadVisible={isDownloadVisible} />
    </header>
  );
};

export default Header;