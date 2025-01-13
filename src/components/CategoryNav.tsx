import React, { useState, useEffect } from 'react';

interface CategoryNavProps {
  categories: string[];
  activeCategory: string;
  onCategoryClick: (category: string) => void;
}

const CategoryNav: React.FC<CategoryNavProps> = ({ 
  categories, 
  activeCategory,
  onCategoryClick 
}) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const nav = document.getElementById('category-nav');
      if (nav) {
        const rect = nav.getBoundingClientRect();
        setIsSticky(rect.top <= 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      id="category-nav"
      className="w-full"
      style={{ marginTop: '1rem' }}
    >
      <div className={`
        w-full bg-white shadow-md
        ${isSticky ? 'fixed top-0 left-0 right-0' : ''}
      `}>
        <div className="w-full flex justify-center">
          <div 
            className="mx-auto"
            style={{ 
              width: '1200px',
              maxWidth: '1200px'
            }}
          >
            <nav className={`
              flex justify-between px-4 py-4 overflow-x-auto whitespace-nowrap
              ${isSticky ? 'w-full max-w-screen-2xl' : ''}
            `}>
              {categories.map((category) => (
                <a
                  key={category}
                  href={`#${category}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onCategoryClick(category);
                  }}
                  className={`flex items-center uppercase text-red-600 hover:underline min-w-fit ${
                    activeCategory === category ? 'underline font-bold' : ''
                  }`}
                >
                  {activeCategory === category && (
                    <img 
                      src="/location.svg" 
                      alt="Location" 
                      className="mr-2" 
                      style={{ width: '16px', height: '16px' }} 
                    />
                  )}
                  {category}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryNav; 