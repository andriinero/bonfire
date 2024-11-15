import { useEffect } from 'react';

const useEscapeListener = (onEscapeDown: () => void) => {
  useEffect(() => {
    const handleEvent = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onEscapeDown();
    };
    window.addEventListener('keydown', handleEvent);

    return () => {
      window.removeEventListener('keydown', handleEvent);
    };
  }, [onEscapeDown]);
};

export default useEscapeListener;
