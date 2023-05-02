import { useEffect, useRef, useState } from 'react';
import './modal.styles.css';
import CloseIcon from './closeIcon.svg';
import SpinnerModal from '../../components/Modal/SpinnerModal';

const Modal = (props) => {
  const modalRef = useRef(null);
  const [newDataHref, setNewDataHref] = useState(null);
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
    fadeOut,
    dataHref,
    closureButton,
    ajaxData,
    customButtonColor,
  } = props;

  const notFocusable = document.querySelectorAll(
    '#root, #formContainer, header, main, footer'
  );

  useEffect(() => {
    if (showModal) {
      if (closeAllModalsBefore) {
        closeAllModals();
      }
      if (dataHref) {
        myParentConditions();
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
      document.body.style.overflow = 'hidden';
      notFocusable.forEach((element) => {
        element.setAttribute('aria-hidden', true);
      });
      modalRef.current.setAttribute('aria-hidden', false);
      modalRef.current.setAttribute('overflow', '');
      modalRef.current.focus();
      document.addEventListener(
        'keydown',
        handleKeyboardNavigation(event, modalRef.current)
      );
      if (customButtonColor) {
        const modal = document.querySelector('#modal');
        modal.style.setProperty('--my-color', customButtonColor);
      }
    }
  }, [showModal]);
  //WARN au survol, qual es?

  const handleModalClose = () => {
    document.body.style.overflow = 'auto';
    document.removeEventListener('keydown', handleKeyboardNavigation);
    notFocusable.forEach((element) => {
      element.setAttribute('aria-hidden', false);
    });
    if (fadeOut && animationDuration) {
      modalRef.current.classList.add('tUv39-modal-blocker-div-fadeOut');
      modalRef.current.style.setProperty(
        'animation-duration',
        `${animationDuration}s`
      );
      setTimeout(() => {
        onClose();
      }, animationDuration * 1000 - 100);
    } else if (fadeOut && !animationDuration) {
      modalRef.current.classList.add('tUv39-modal-blocker-div-fadeOut');
      modalRef.current.style.setProperty('animation-duration', `2s`);
      setTimeout(() => {
        onClose();
      }, 1900);
    } else {
      onClose();
    }
  };

  const handleKeyboardNavigation = (event, parentElement) => {
    event.preventDefault();
    event.stopPropagation();
    const tabbableElementsSelectors =
      '#dialogTitle, #dialogDesc, #dialogButton';
    const allTabbableElements = parentElement.querySelectorAll(
      tabbableElementsSelectors
    );
    const trapFocusInModal = (event, parentElement) => {
      let index = Array.from(allTabbableElements).findIndex(
        (i) => i === parentElement.querySelector(':focus')
      );
      if (event.shiftKey === true) {
        index--;
      } else {
        index++;
      }
      if (index >= allTabbableElements.length) {
        index = 0;
      }
      if (index < 0) {
        index = allTabbableElements.length - 1;
      }
      allTabbableElements[index].focus();
    };

    parentElement.addEventListener('keydown', function (event) {
      event.preventDefault();
      if (event.keyCode === 9) {
        trapFocusInModal(event, parentElement);
        console.log('où est le focus', document.activeElement);
      } else if (event.keyCode !== 9) {
        event.preventDefault();
        //event.stopImmediatePropagation();
        if (event.keyCode === 27) {
          handleModalClose();
        } else if (
          document.activeElement.id === 'dialogButton' &&
          event.keyCode === 13
        ) {
          handleModalClose();
        }
      }
    });
  };

  const myParentConditions = () => {
    if (dataHref.includes('#')) {
      console.log('les daaaaaata,', dataHref);
      const href = decodeURI(dataHref);
      const anchor = href.split('#')[1];
      setNewDataHref(anchor);
    }
    if (dataHref.includes('#') == false) {
      console.log('CEST UN LIEN EXTERNE', dataHref);

      setNewDataHref(<SpinnerModal />);
      fetch(dataHref)
        .then((response) => {
          console.log('REPONSE', response);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          const func = eval(`(${ajaxData})`);
          console.log("J'ai reçu les data", data, func);
          setNewDataHref(<div>{func}</div>);
        })
        .catch((error) => {
          console.error('Il y a eu un problème avec la requête fetch:', error);
          setNewDataHref(<div>"fetch return error"</div>);
        });
    }
  };

  //OPTIONS
  const handleBackDropClick = () => {
    backDropClickAndClose ? handleModalClose() : null;
  };
  //OPTIONS
  const closeAllModals = () => {
    const modals = document.querySelectorAll('.tUv78');
    //console.log('toutes les modals', modals);
    modals.forEach((modal) => {
      if (typeof modal.handleModalClose === 'function') {
        modal.handleModalClose();
      }
    });
  };

  // Voici la modal
  return showModal ? (
    <div
      id="modalBackdrop"
      className="tUv39-modal-blocker-div tUv78"
      onClick={handleBackDropClick}
    >
      <div
        tabIndex="-1"
        ref={modalRef}
        id="modal"
        role="dialog"
        aria-labelledby="dialogTitle"
        aria-describedby="dialogDesc"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="tUv39-modal-container"
      >
        <h3 className="tUv39-modalclose-h3" id="dialogTitle" tabIndex={1}>
          {title}
        </h3>
        <div
          role="p"
          className="tUv39-modalclose-p"
          id="dialogDesc"
          tabIndex={2}
        >
          {children}
          <br />
          {newDataHref}
        </div>
        {closureButton ? (
          <button
            onClick={handleModalClose}
            id="dialogButton"
            className="tUv39-modalclose-button"
            aria-label="close modal button"
            tabIndex={3}
          >
            {closureButton}
          </button>
        ) : (
          <button
            onClick={handleModalClose}
            id="dialogButton"
            className="tUv39-modalclose-button-default"
            aria-label="close modal button"
            tabIndex={3}
            style={{ customButtonColor }}
          >
            <img src={CloseIcon} width={'20px'} />
          </button>
        )}
      </div>
    </div>
  ) : null;
};

export default Modal;
