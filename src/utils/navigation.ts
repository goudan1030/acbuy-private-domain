export const getAcbuyUrl = (isMobile: boolean, path: string) => {
  const baseUrl = isMobile ? 'https://m.acbuy.com' : 'https://www.acbuy.com';
  return `${baseUrl}${path}`;
};

export const handleAcbuyNavigation = (path: string) => {
  const isMobile = window.innerWidth < 1024;
  window.location.href = getAcbuyUrl(isMobile, path);
}; 