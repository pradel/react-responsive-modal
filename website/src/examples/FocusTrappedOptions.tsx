import React, { useRef } from 'react';
import { Modal } from 'react-responsive-modal';

const App = () => {
  const [open, setOpen] = React.useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <button className="button" onClick={() => setOpen(true)}>
        Open modal
      </button>

      <Modal
        ref={modalRef}
        open={open}
        onClose={() => setOpen(false)}
        focusTrapOptions={{ focusOn: modalRef }}
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
