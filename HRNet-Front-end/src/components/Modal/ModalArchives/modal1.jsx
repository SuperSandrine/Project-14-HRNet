import { useState, useEffect } from 'react';

const Modal1 = ({ isOpen, onClose, children }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    if (isOpen) {
      setIsClosing(false);
      document.addEventListener('keydown', handleKeyDown);
    } else {
      setIsClosing(true);
      document.removeEventListener('keydown', handleKeyDown);
      const transitionDuration = 5000; // 200ms to match CSS, it's to small so 5s
      setTimeout(() => {
        setIsClosing(false);
      }, transitionDuration);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isMounted]);

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleTransitionEnd = () => {
    if (isClosing) {
      onClose();
    }
  };

  if (!isOpen && !isClosing) {
    return null;
  }

  return (
    <div
      className="modal"
      onClick={handleOverlayClick}
      onTransitionEnd={handleTransitionEnd}
    >
      <div className="modal-content">{children}</div>
    </div>
  );
};

Modal1.defaultProps = {
  isOpen: false,
  onClose: () => {},
};

export default Modal1;
