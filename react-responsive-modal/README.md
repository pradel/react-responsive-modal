# react-responsive-modal

[![npm version](https://img.shields.io/npm/v/react-responsive-modal.svg)](https://www.npmjs.com/package/react-responsive-modal)
[![npm downloads per month](https://img.shields.io/npm/dm/react-responsive-modal.svg)](https://www.npmjs.com/package/react-responsive-modal)
[![codecov](https://img.shields.io/codecov/c/github/pradel/react-responsive-modal/master.svg)](https://codecov.io/gh/pradel/react-responsive-modal)

A simple responsive and accessible react modal.

- Focus trap inside the modal.
- Centered modals.
- Scrolling modals.
- Multiple modals.
- Accessible modals.
- Easily customizable via props.
- Typescript support
- [Small bundle size](https://bundlephobia.com/result?p=react-responsive-modal)

## Documentation

- [Getting started](https://react-responsive-modal.leopradel.com/)
  - [Installation](https://react-responsive-modal.leopradel.com/#installation)
  - [Usage](https://react-responsive-modal.leopradel.com/#usage)
  - [Props](https://react-responsive-modal.leopradel.com/#props)
  - [Licence](https://react-responsive-modal.leopradel.com/#license)

## Installation

With npm: `npm install react-responsive-modal --save`

Or with yarn: `yarn add react-responsive-modal`

## Usage

[![Edit react-responsive-modal](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/9jxp669j2o)

```javascript
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const App = () => {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  return (
    <div>
      <button onClick={onOpenModal}>Open modal</button>
      <Modal open={open} onClose={onCloseModal} center>
        <h2>Simple centered modal</h2>
      </Modal>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
```

## Props

Check the documentation: https://react-responsive-modal.leopradel.com/#props.

## License

MIT © [Léo Pradel](https://www.leopradel.com/)
