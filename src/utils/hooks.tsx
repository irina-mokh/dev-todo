import { useCallback, useState } from 'react';

export const usePopup = (mode: boolean): [boolean, () => void, () => void] => {
  const [isPopup, setIsPopup] = useState(mode);

  const open = useCallback(() => {
    setIsPopup(true);
  }, []);
  const close = useCallback(() => {
    setIsPopup(false);
  }, []);

  return [isPopup, open, close];
};
