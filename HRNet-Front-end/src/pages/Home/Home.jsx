import React, { useState } from 'react';
import RootLayout from '../../Layout/RootLayout';
import { Button } from '@mui/material';
import Modal from '../../components/Modal/Modal';
import SpinnerModal from '../../components/Modal/SpinnerModal';

const Home = () => {
  const [montre, setMontre] = useState(false);
  const [montre2, setMontre2] = useState(false);
  const [montre3, setMontre3] = useState(false);

  const [dataToGive, setDataToGive] = useState(null);

  return (
    <div>
      {/* //<h1> Welcome home </h1> */}
      <RootLayout>
        <h2 id="heading"> Welcome home page </h2>
        <Button variant="contained" onClick={() => setMontre(true)}>
          test la modale
        </Button>
        <br />
        <a
          href="#heading"
          onClick={(e) => {
            //e.preventDefault();
            setDataToGive(e.currentTarget.href);
            setMontre2(true);
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
      </RootLayout>
      {/* {montre && ( */}
      <Modal
        showModal={montre}
        onClose={() => setMontre(false)}
        fadeIn
        fadeOut
        title="test"
        //onOpen={document.querySelector('#modal').parentNode}
      >
        {'Voici un test'}
      </Modal>
      {/* )} */}
      {/* {montre2 && ( */}
      <Modal
        showModal={montre2}
        onClose={() => setMontre2(false)}
        title="test2"
        dataHref={dataToGive}
        closureButton={'je ferme'}
        ajaxData="data.name"
      >
        {'voici le lien sur lequel vous avez cliqué'}
      </Modal>
      {/* )} */}
    </div>
  );
};

export default Home;
