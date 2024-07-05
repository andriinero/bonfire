import { useEffect } from 'react';

const useCloseModalListener = (handleCloseModal: () => void) => {
  useEffect(() => {
    const onEscapeDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleCloseModal();
    };
    window.addEventListener('keydown', onEscapeDown);

    return () => {
      window.removeEventListener('keydown', onEscapeDown);
    };
  }, [handleCloseModal]);
};

export default useCloseModalListener;
