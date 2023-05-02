import { useEffect, useRef } from 'react';
import './modal.styles.css';

const Modal = (props) => {
  const modalRef = useRef(null);
  console.log('les props de la modal', props);
  const { children, onClose, showModal, title } = props;
  const notFocusable = document.querySelectorAll(
    '#root, #formContainer, header, main, footer'
  );

  // on close= change showModal en false
  if (!showModal) {
    return null;
  } else {
    const handleKeyDown = (event) => {
      if (event.keyCode === 27) {
        handleModalClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    document.body.style.backgroundColor = 'pink';
    notFocusable.forEach((element) => {
      element.setAttribute('aria-hidden', true);
    });
    console.log('notfocus,', notFocusable);
    //const modal = document.querySelector('#modal');
    //modal.setAttribute('aria-hidden', false);
    //modal.setAttribute('overfow', 'visible');
    console.log("est-ce que j'ai modal ref", modalRef.current);
    modalRef.current.focus();
    modalRef.current.setAttribute('aria-hidden', false);
    modalRef.current.setAttribute('overflow', 'visible');

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

    return (
      <div
        //onClick={props.onClose}
        id="modalBlocker"
        className="tUv39-modalfirstdiv"
        // style={{
        //   position: 'fixed',
        //   inset: '0px',
        //   backgroundColor: 'rgba(0, 0, 0, 0.5)',
        //   backdropFilter: 'blur(3px)',
        //   display: 'flex',
        //   flexDirection: 'column',
        //   alignItems: 'center',
        //   justifyContent: 'center',
        //   overflow: 'auto',
        //   zIndex: '2',
        //   // FRANçois: zIndex, c'est très mal ou ça se justifie?
        // }}
        onClick={handleModalClose}
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
          // style={{
          //   width: 'fit-content',
          //   maxWidth: '80vw',
          //   backgroundColor: 'white',
          //   padding: '5vw',
          //   borderRadius: '1vw',
          //   boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.8)',
          //   display: 'flex',
          //   flexDirection: 'column',
          //   justifyContent: 'center',
          //   position: 'absolute',
          //   top: '50%',
          //   left: '50%',
          //   transform: 'translate(-50%, -50%)',
          // }}
        >
          <h3 className="tUv39-modalclose-h3" id="dialogTitle">
            {title}
          </h3>
          <p className="tUv39-modalclose-p" id="dialogDesc">
            {children}
          </p>
          <button
            onClick={onClose}
            className="tUv39-modalclose-button"
            // style={{
            //   padding: '2vw',
            //   borderRadius: '4px',
            //   //border: 'none',
            //   //backgroundColor: '${primary}',
            // }}
          >
            Close
          </button>
        </div>
      </div>
    );
  }
};

export default Modal;
