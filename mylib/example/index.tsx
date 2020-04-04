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
      <Modal open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
