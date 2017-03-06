# react-responsive-modal

[![Greenkeeper badge](https://badges.greenkeeper.io/pradel/react-responsive-modal.svg)](https://greenkeeper.io/)
A simple responsive react modal.

[![Build Status](https://travis-ci.org/pradel/react-responsive-modal.svg?branch=master)](https://travis-ci.org/pradel/react-responsive-modal)

You can find a demo [here](http://pradel.github.io/react-responsive-modal/).
Or you can run examples
```
git clone https://github.com/pradel/react-responsive-modal
cd react-responsive-modal
yarn
yarn run build:examples
open examples/index.html
```

## Installation

With npm: `npm install react-responsive-modal --save`

Or with yarn: `yarn add react-responsive-modal`

## Usage

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.state = {
      open: false,
    };
  }

  onOpenModal() {
    this.setState({ open: true });
  }

  onCloseModal() {
    this.setState({ open: false });
  }

  render() {
    const { open } = this.state;
    return (
      <div>
        <button onClick={this.onOpenModal}>Open modal</button>
        <Modal open={open} onClose={this.onCloseModal} little>
          <h2>Simple centered modal</h2>
        </Modal>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
```

## Props

`open`: (Bool) __Required__ Control if the modal is open or not.

`onClose`: (Function) __Required__ Fired when the Modal is requested to be closed by a click on the overlay or when user press esc key.

`closeOnEsc`: (Bool) default: true is the modal closable when user press esc key.

`closeOnOverlayClick`: (Bool) default: true is the modal closable when user click on overlay.

`little`: (Bool) Is the dialog centered __When you don't have a lot of content__.

`showCloseIcon`: (Bool) default: true Show the close icon.

`closeIconSize`: (Number) default: 28 Close icon size.

`children`: (Node) The content of the modal.

`overlayClassName`: (String) Classname for overlay div.

`modalClassName`: (String) Classname for modal content div.

`closeIconClassName`: (String) Classname for close icon svg.

`overlayStyle`: (Object) Inline style for overlay div.

`modalStyle`: (Object) Inline style for modal content div.
