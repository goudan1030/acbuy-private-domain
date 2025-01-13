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
      className="w-full px-2"
      style={{ marginTop: '1rem' }}
    >
      <div className={`
        w-full bg-white shadow-md rounded-lg
        ${isSticky ? 'fixed top-0 left-0 right-0 z-50 rounded-none' : ''}
      `}>
        <div className="max-w-[1200px] mx-auto">
          <nav 
            className="flex justify-between overflow-x-auto whitespace-nowrap"
            style={{ 
              padding: '0 16px',
            }}
          >
            {categories.map((category) => (
              <a
                key={category}
                href={`#${category}`}
                onClick={(e) => {
                  e.preventDefault();
                  onCategoryClick(category);
                  const element = document.getElementById(category);
                  if (element) {
                    const offset = isSticky ? 60 : 0;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                }}
                className={`flex items-center uppercase text-red-600 hover:underline min-w-fit py-4 ${
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
  );
};

export default CategoryNav; 