import React, { useState } from 'react';
import RootLayout from '../../Layout/RootLayout';
import { Button } from '@mui/material';
import { Modal } from 'react-modal-tuv39';

const Modales = () => {
  const [montre, setMontre] = useState(false);
  const [montre2, setMontre2] = useState(false);
  const [montre3, setMontre3] = useState(false);
  const [montre4, setMontre4] = useState(false);

  const [dataToGive, setDataToGive] = useState(null);

  return (
    <div>
      <RootLayout>
        <h2 id="heading"> Welcome on modales tests page </h2>
        <p>
          {' '}
          On the project demands was to create a "modal" plugin. Hosted on npm
          package, this modal plugin is tested bellow.
        </p>
        <main
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingBottom: '20px',
            justifyContent: 'space-evenly',
            height: '40vh',
          }}
        >
          <h3>Boutons de tests de modals</h3>
          <Button variant="contained" onClick={() => setMontre(true)}>
            test la modal
          </Button>
          <Button
            variant="contained"
            component="a"
            href="#heading"
            onClick={(e) => {
              setDataToGive(e.target);
              setMontre2(true);
            }}
          >
            lien interne
          </Button>
          <Button
            variant="contained"
            component="a"
            href="https://www.npmjs.com/package/react-modal-tuv39"
            onClick={(e) => {
              setDataToGive(e.target);
              setMontre4(true);
            }}
          >
            un lien externe
          </Button>
          <Button
            variant="contained"
            href="https://jsonplaceholder.typicode.com/users/1"
            onClick={(e) => {
              setDataToGive(e.target);
              setMontre2(true);
            }}
          >
            un lien vers API
          </Button>
        </main>
        <p>
          Test avec l'api{' '}
          <a href="https://jsonplaceholder.typicode.com/users/1">
            https://jsonplaceholder.typicode.com/users/1
          </a>{' '}
          pour le lien externe
        </p>
      </RootLayout>
      <Modal
        showModal={montre}
        onClose={() => setMontre(false)}
        fadeIn
        animationDuration="0.7"
        fadeOut
        title="test d'une modal nested"
        backDropClickAndClose
        closureButton="close if clicked"
        customButtonColor="pink"
      >
        <button onClick={() => setMontre3(true)}>ouvre une autre modal</button>
      </Modal>
      <Modal
        closeAllModalsBefore
        showModal={montre3}
        onClose={() => setMontre3(false)}
        closureButton="je ferme"
        customButtonColor="violet"
      />
      <Modal
        showModal={montre2}
        onClose={() => setMontre2(false)}
        title="test2"
        dataHref={dataToGive}
        dataHrefIsAnAPI
        ajaxData="data.name"
        customButtonColor="orange"
      >
        {'voici le lien sur lequel vous avez cliqué'}
      </Modal>
      <Modal
        showModal={montre4}
        onClose={() => setMontre4(false)}
        title="test4"
        dataHref={dataToGive}
        closureButton="je ferme"
        customButtonColor="rgba(255, 99, 71, 0.5)"
      >
        {'voici le lien sur lequel vous avez cliqué'}
      </Modal>
    </div>
  );
};

export default Modales;
