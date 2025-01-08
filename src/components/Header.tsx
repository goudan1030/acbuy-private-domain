import React, { useState } from 'react';
import NavigationBar from './NavigationBar';

const Header: React.FC = () => {
  const [isDownloadVisible, setIsDownloadVisible] = useState(true);

  const handleDownloadClose = () => {
    setIsDownloadVisible(false);
  };


// ... 其他代码保持不变 ...

return (
  <header className="bg-white shadow-md">
    {isDownloadVisible && (
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md z-50 md:top-auto md:bottom-0"> {/* 调整定位为底部 */}
        <div
          className="flex justify-between items-center"
          style={{ padding: '0 10px  0 10px', minHeight: '80px', maxWidth: '1200px', margin: '0 auto' }}
        >
          {/* 隐藏删除按钮（电脑端） */}
          <button onClick={handleDownloadClose} style={{ marginLeft: '0.25rem' }} className="md:hidden">
            <img src="/close.svg" alt="Close" className="w-4 h-4" />
          </button>
          {/* App Logo 和内容左对齐 */}
          <div className="flex items-center gap-1 px-1 md:pl-0"> {/* 添加 md:pl-0 确保左对齐 */}
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
          {/* GET 和 Close 按钮 */}
          <div className="flex items-center gap-2">
            <a href="your-app-store-link" className="text-black font-bold border border-black px-4 py-2 rounded">
              GET
            </a>
            {/* 新增 Close 按钮 */}
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