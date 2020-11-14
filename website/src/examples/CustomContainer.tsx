import React from 'react';
import { Modal } from 'react-responsive-modal';

const App = () => {
  const [open, setOpen] = React.useState(false);

  const myRef = React.useRef(null);

  return (
    <>
      <div ref={myRef} />
      <button className="button" onClick={() => setOpen(true)}>
        Open modal
      </button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        center
        container={myRef.current}
      >
        <p>
          Take a look with the devtools, you can see that the modal is inside
          the div we are targeting and not at the end of the body tag.
        </p>
      </Modal>
    </>
  );
};

export default App;
