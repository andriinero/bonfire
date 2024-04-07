import { useLocation } from 'react-router-dom';

const usePathnameEnd = () => {
  const location = useLocation();
  const end = location.pathname.split('/').pop();
  
  return end;
};

export default usePathnameEnd;
