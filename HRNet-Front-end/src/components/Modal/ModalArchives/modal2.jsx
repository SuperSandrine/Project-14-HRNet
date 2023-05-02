import { useState, useEffect } from 'react';

function Modal2({ children, isOpen, onClose }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleKeyDown = (event) => {
    if (event.keyCode === 27 && onClose) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen && onClose) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {isMounted && isOpen && (
        <div
          className="modal"
          onClick={(event) => {
            if (event.target === event.currentTarget && onClose) {
              onClose();
            }
          }}
        >
          <div className="modal__content">{children}</div>
        </div>
      )}
    </>
  );
}

export default Modal2;
