import React from 'react';
import { Modal } from 'react-responsive-modal';

const App = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <button className="button" onClick={() => setOpen(true)}>
        Open modal
      </button>

      <Modal open={open} onClose={() => setOpen(false)} center keepMounted>
        <h2>The modal is kept mounted</h2>
        <p>
          Type something in the input below, close the modal and reopen it. The
          value is preserved because the modal is not unmounted when closed.
        </p>
        <input type="text" placeholder="This value is preserved" />
      </Modal>
    </>
  );
};

export default App;
