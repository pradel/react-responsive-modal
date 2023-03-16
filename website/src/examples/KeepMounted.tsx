import React from 'react';
import { Modal } from 'react-responsive-modal';

const App = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <button className="button" onClick={() => setOpen(true)}>
        Open modal
      </button>

      <Modal open={open} onClose={() => setOpen(false)} keepMounted>
        <div style={{ padding: '24px' }}>
          This modal will stay mounted even when closed.
          <br />
          <br />
          <input
            defaultValue="And DOM state of this <input> will be kept alive!"
            style={{
              border: '1px solid black',
              borderRadius: '4px',
              padding: '2px',
            }}
          />
        </div>
      </Modal>
    </>
  );
};

export default App;
