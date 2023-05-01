// - block le body // unblock
// - s'affiche par dessus la page en cours (avec un fond grise)
// - s'affiche avec un contenu personnalisé
// - a un bouton pour se fermeture
// - si on appuie sur escape : ça ferme la modale (accessibilité)
// - OPTIONS: - si on click en dehors de la modale, ça la ferme

// Ajouter un attribut aria-modal="true" pour indiquer que la fenêtre modale est un dialogue.

// Ajouter un attribut aria-hidden="true" à tous les éléments en dehors de la fenêtre modale pour les rendre inaccessibles au clavier et aux technologies d'assistance pendant que la fenêtre modale est ouverte.

// Ajouter un attribut aria-modal="false" à tous les éléments en dehors de la fenêtre modale lorsque la fenêtre modale est fermée pour les rendre à nouveau accessibles.

//ouvrir une fenêtre modale =
//    -bloquand l'arriere plan, ( met body.css overflow hidden)(applique blocker class)(a la fonction de dofade en passant de css opacity 0 avec animate( opacity 1, temps)
//    -affiche modale
//    -fermeture avec clic sur escape, les autres touches sont bloquées
//    -option:durée animation de fade in "doFade(temps)"
//    -option: fermer la fenetre en cliquant en dehors
//    -Option: ferme toutes les autres modales ouvertes
//
//fermer la fenêtre modal=
//    -masque la modale
//    -débloque l'arrière plan (si modale n'est plus en isactive, alors body.css(overflow))
//    -enlever le bloquage du clavier
//    -option: durée de l'animation de fade-out (option hide)
//
//si l'ouverture de la fenêtre est déclenchée par un lien:
//    -la modale peut charger du contenu à partir de cette url??, alors le href est affiché dans la modale (s'il n'y a pas de href, return nuul)
//si l'ouverture de la fenêtre est déclenchée par un ajax:
//    -crée une div/ affiche un spinner (un spinner qu'on lui envoit en option)//quand elle est chargée cache le spinner et affiche le résultat// si echec de chargement, un message d'échec
//sinon l'ouverture:
//    on applique l'élement simplement et il a le focus (anchor??)
//
//personnalisation=
//    -affichage et masquage du bouton
//    -personnalisation du texte du bouton (avec un"a" et un text)(affichage possible en fade-in?? de ce bouton close)
//    -personnalisation apparence

const Modal = (props) => {
  if (!props.showModal) {
    return null;
  } else {
    const body = document.getElementsByTagName('body');
    console.log('body', body);
    body[0].style.overflow = 'hidden';
    //body[0].style.backgroundColor = 'pink';

    const notFocusables = document.querySelectorAll('div, form  ');
    notFocusables.forEach((el) => el.setAttribute('aria-hidden', 'true'));
    console.log('notfocus,', notFocusables);

    // const handleTab = (e) => {
    //   const modal = document.getElementById('modal');

    //   const focusableElements = document.querySelectorAll(
    //     '#modal >div, #modal > div > * '
    //   );
    //   console.log('focusable', focusableElements);
    //   //const firstElement = focusableElements[0];
    //const lastElement = focusableElements[focusableElements.length - 1];

    // trap the focus inside modal
    // const focusInModal = (e) => {
    //   e.preventDefault();
    //   e.stopPropagation();
    //__________________
    // let index = Array.from(focusableElements).findIndex(
    //   (index) => index === modal.querySelector(':focus')
    // );
    // console.log('index', index);
    // e.preventDefault();
    // e.stopPropagation();
    // if (e.key == 'Tab' && e.shiftKey) {
    //   index--;
    //   if (index < 0) {
    //     index = focusableElements.length - 1;
    //   }
    //   focusableElements[index].focus();
    // } else if (e.key == 'Tab' && !e.shiftKey) {
    //   index++;
    //   if (index >= focusableElements.length) {
    //     index = 0;
    //   }
    //   focusableElements[index].focus();
    // }
    //__________________________

    //  };
    //else if (e.key === 'Escape' || e.key === 'Esc') {
    //  handleModalClose();

    // Keyboard navigation
    //const insideLightboxModal = document.querySelector('.lightbox_modal');

    //  } else if (e.key !== 'Tab') {
    //e.stopImmediatePropagation();
    //    e.preventDefault();
    // } else if (e.key === 'Escape' || e.key === 'Esc') {
    //   handleModalClose();
    // } else if (
    //   // document.activeElement.tabIndex === 6 &&
    //   e.key === 'Enter'
    // ) {
    //   handleModalClose();
    // }
    //}
    //};

    //   if (e.key === 'Tab' && !e.shiftKey) {
    //     e.preventDefault();
    //     focusableElements[0].focus();

    //     // if (document.activeElement === lastElement) {
    //     //   e.preventDefault();
    //     //   firstElement.focus();
    //     // }
    //   } else if (e.key === 'Tab' && e.shiftKey) {
    //     focusableElements[focusableElements.length - 1].focus();
    //     // if (document.activeElement === firstElement) {
    //     //   e.preventDefault();
    //     //   lastElement.focus();
    //     // }
    //   }
    // };

    // const handleKeyDown = (e) => {
    //   if (e.key === 'Escape') {
    //     props.onClose();
    //   }
    // };

    // const handleMouseDown = (e) => {
    //   if (!document.getElementById('modal').contains(e.target)) {
    //     e.stopPropagation();
    //   }
    // };

    const handleModalClose = () => {
      body[0].style.overflow = 'auto';
      body[0].style.backgroundColor = 'white';
      //document.removeEventListener('keydown', handleKeyDown);
      //document.removeEventListener('mousedown', handleMouseDown);
      //document.querySelector('#' + props.triggerButtonId).focus();
      document
        .querySelectorAll('body > *:not(#modal)')
        .forEach((el) => el.setAttribute('aria-hidden', 'false'));
      props.onClose();
    };

    //document.addEventListener('keydown', handleKeyDown);
    //document.addEventListener('mousedown', handleMouseDown);

    return (
      <div
        //onClick={props.onClose}
        id="modal"
        role="dialog"
        aria-labelledby="dialogTitle"
        aria-describedby="dialogDesc"
        aria-modal="true"
        style={{
          position: 'fixed',
          inset: '0px',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(3px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'auto',
          zIndex: '2',
          // FRANçois: zIndex, c'est très mal ou ça se justifie?
        }}
        onClick={handleModalClose}
        //onKeyDown={handleTab}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            width: 'fit-content',
            maxWidth: '80vw',
            backgroundColor: 'white',
            padding: '5vw',
            borderRadius: '1vw',
            boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.8)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <h3 id="dialogTitle">{props.title}</h3>
          <p id="dialogDesc">{props.children}</p>
          <button
            onClick={props.onClose}
            style={{
              padding: '2vw',
              borderRadius: '4px',
              //border: 'none',
              //backgroundColor: '${primary}',
            }}
          >
            Close
          </button>
        </div>
      </div>
    );
  }
};

export default Modal;
