import React from 'react';
import { Modal } from 'react-responsive-modal';

const App = () => {
  // import './examples/custom-animation.css';
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <button className="button" onClick={() => setOpen(true)}>
        Open modal
      </button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        center
        classNames={{
          animationIn: 'customEnterAnimation',
          animationOut: 'customLeaveAnimation',
        }}
        animationDuration={1000}
      >
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
          hendrerit risus, sed porttitor quam.
        </p>
      </Modal>
    </>
  );
};

export default App;
