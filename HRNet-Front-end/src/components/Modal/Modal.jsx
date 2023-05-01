import { useEffect, useRef } from 'react';
import './modal.styles.css';

const Modal = (props) => {
  const modalRef = useRef(null);
  console.log('les props de la modal', props);
  const {
    children,
    onClose,
    showModal,
    title,
    backDropClickAndClose,
    closeAllModalsBefore,
    fadeIn,
    animationDuration,
  } = props;

  const notFocusable = document.querySelectorAll(
    '#root, #formContainer, header, main, footer'
  );

  useEffect(() => {
    if (showModal) {
      if (closeAllModalsBefore) {
        closeAllModals();
      }
      if (fadeIn && animationDuration) {
        modalRef.current.classList.add('tUv39-modal-blocker-div-fadeIn');
        modalRef.current.style.setProperty(
          'animation-duration',
          `${animationDuration}s`
        );
      } else if (fadeIn && !animationDuration) {
        modalRef.current.classList.add('tUv39-modal-blocker-div-fadeIn');
        modalRef.current.style.setProperty('animation-duration', `2s`);
      }
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      document.body.style.backgroundColor = 'yellow';
      notFocusable.forEach((element) => {
        element.setAttribute('aria-hidden', true);
      });
      console.log('notfocus,', notFocusable);

      console.log("est-ce que j'ai modal ref", modalRef);
      modalRef.current.focus();
      modalRef.current.setAttribute('aria-hidden', false);
      modalRef.current.setAttribute('overflow', '');
    }
  }, [showModal]);

  const handleKeyDown = (event) => {
    if (event.keyCode === 27) {
      handleModalClose();
    }
  };

  const handleModalClose = () => {
    document.body.style.overflow = 'auto';
    document.body.style.backgroundColor = 'white';
    //      notFocusable.setAttribute('aria-hidden', false);
    document.removeEventListener('keydown', handleKeyDown);

    notFocusable.forEach((element) => {
      element.setAttribute('aria-hidden', false);
    });
    onClose();
  };
  const handleBackDropClick = () => {
    backDropClickAndClose ? handleModalClose() : null;
  };
  function closeAllModals() {
    const modals = document.querySelectorAll('.tUv78');
    console.log('toutes les modals', modals);
    modals.forEach((modal) => {
      if (typeof modal.handleModalClose === 'function') {
        modal.handleModalClose();
        //document.body.style.backgroundColor = 'blue';
      }
    });
  }

  return showModal ? (
    <div
      id="modalBackdrop"
      className="tUv39-modal-blocker-div tUv78"
      onClick={handleBackDropClick}
      //onKeyDown={handleTab}
    >
      <div
        ref={modalRef}
        id="modal"
        role="dialog"
        aria-labelledby="dialogTitle"
        aria-describedby="dialogDesc"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="tUv39-modalseconddiv"
      >
        <h3 className="tUv39-modalclose-h3" id="dialogTitle">
          {title}
        </h3>
        <p className="tUv39-modalclose-p" id="dialogDesc">
          {children}
        </p>
        <button onClick={handleModalClose} className="tUv39-modalclose-button">
          Close
        </button>
      </div>
    </div>
  ) : null;
  //}
};

export default Modal;
