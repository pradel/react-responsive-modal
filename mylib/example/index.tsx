import 'react-app-polyfill/ie11';
import * as React from 'react';
import { useState } from 'react';
import * as ReactDOM from 'react-dom';
import { Modal } from '../.';
import '../src/styles.css';

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      Hey
      <button onClick={() => setOpen(!open)}>Open</button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <h2>Simple centered modal</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
          hendrerit risus, sed porttitor quam.
        </p>
      </Modal>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
