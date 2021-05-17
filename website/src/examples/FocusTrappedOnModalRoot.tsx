import React from 'react';
import { Modal } from 'react-responsive-modal';

const App = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <button className="button" onClick={() => setOpen(true)}>
        Open modal
      </button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        focusTrapOptions={{ focusOn: 'modalRoot' }}
      >
        <h2>Try tabbing/shift-tabbing thru elements</h2>
        <form action="">
          <p>
            <label htmlFor="firstName">
              First name (I shouldn't be focused - press Tab to focus me)
              <input type="text" />
            </label>
          </p>
          <p>
            <label htmlFor="lastName">
              Last name
              <input type="text" />
            </label>
          </p>
          <button>test</button>
          <input type="submit" value="Submit" />
        </form>
      </Modal>
    </>
  );
};

export default App;
