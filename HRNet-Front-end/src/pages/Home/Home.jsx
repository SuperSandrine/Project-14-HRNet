import React, { useState } from 'react';
import RootLayout from '../../Layout/RootLayout';
import { Button } from '@mui/material';
import Modal from '../../components/Modal/Modal';

const Home = () => {
  const [montre, setMontre] = useState(false);
  const [montre2, setMontre2] = useState(false);
  const [montre3, setMontre3] = useState(false);
  const [dataToGive, setDataToGive] = useState(null);

  return (
    <div>
      <RootLayout>
        <h2 id="heading"> Welcome home page </h2>
        <Button variant="contained" onClick={() => setMontre(true)}>
          test la modale
        </Button>
        <br />
        <a
          href="#heading"
          onClick={(e) => {
            //console.log('le heading', e.target);
            setDataToGive(e.currentTarget.href);
            setMontre2(true);
            //WARN: est-ce qu'il y a un moyen de récupérer ce qu'il y a dans le titre de h2?
          }}
        >
          {' '}
          un lien avec modal
        </a>
        <br />

        <a
          href="https://jsonplaceholder.typicode.com/users/1"
          onClick={(e) => {
            setDataToGive(e.currentTarget.href);
            setMontre2(true);
          }}
        >
          {' '}
          un lien externe avec modal
        </a>
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
        animationDuration="10"
        //fadeOut
        title="test"
        backDropClickAndClose
        //closeAllModalsBefore
        //dataHref={dataToGive}
        customButtonColor="pink"
      >
        <button onClick={() => setMontre3(true)}>test</button>
      </Modal>
      <Modal
        //closeAllModalsBefore
        showModal={montre3}
        onClose={() => setMontre3(false)}
        //    title="ça marche"
      />
      <Modal
        showModal={montre2}
        onClose={() => setMontre2(false)}
        title="test2"
        dataHref={dataToGive}
        closureButton={'je ferme'}
        //ajaxData="data.name"
        customButtonColor="rgba(255, 99, 71, 0.2)"
      >
        {'voici le lien sur lequel vous avez cliqué'}
      </Modal>
    </div>
  );
};

export default Home;
