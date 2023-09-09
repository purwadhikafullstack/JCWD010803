import { useState } from 'react';

const useSearchModal = () => {
  
  const [isOpen, setIsOpen] = useState(true); // saat search diklik, isOpen ga berubah statenya

 
  const onOpen = () => {
    setIsOpen(true);
  };


  const onClose = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    onOpen,
    onClose,
  };
};

export default useSearchModal;
