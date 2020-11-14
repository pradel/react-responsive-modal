import React from 'react';
import { Modal } from 'react-responsive-modal';

const App = () => {
  const [openFirst, setOpenFirst] = React.useState(false);
  const [openSecond, setOpenSecond] = React.useState(false);

  const littleLorem = (
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar
      risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit
      risus, sed porttitor quam.
    </p>
  );

  return (
    <>
      <button className="button" onClick={() => setOpenFirst(true)}>
        Open first modal
      </button>

      <Modal open={openFirst} onClose={() => setOpenFirst(false)} center>
        <p>First modal</p>
        {littleLorem}
        <button className="button" onClick={() => setOpenSecond(true)}>
          Open second modal
        </button>
      </Modal>
      <Modal open={openSecond} onClose={() => setOpenSecond(false)} center>
        <p>Second modal</p>
        {littleLorem}
      </Modal>
    </>
  );
};

export default App;
