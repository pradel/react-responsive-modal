# react-responsive-modal

[![npm version](https://badge.fury.io/js/react-responsive-modal.svg)](https://badge.fury.io/js/react-responsive-modal)
[![npm](https://img.shields.io/npm/dm/react-minimalist-portal.svg)](https://www.npmjs.com/package/react-minimalist-portal)
[![Build Status](https://travis-ci.org/pradel/react-responsive-modal.svg?branch=master)](https://travis-ci.org/pradel/react-responsive-modal)
[![dependencies Status](https://david-dm.org/pradel/react-responsive-modal/status.svg)](https://david-dm.org/pradel/react-responsive-modal)

A simple responsive react modal.
- Centered modals.
- Scrolling modals.
- Multiple modals.

## Demo

You can find a demo [here](https://react-responsive-modal.leopradel.com/).

<a target='_blank' rel='nofollow' href='https://app.codesponsor.io/link/TPcxj3ZMAXdSxzhvJ7SzjaQY/pradel/react-responsive-modal'>
  <img alt='Sponsor' width='888' height='68' src='https://app.codesponsor.io/embed/TPcxj3ZMAXdSxzhvJ7SzjaQY/pradel/react-responsive-modal.svg' />
</a>

## Installation

With npm: `npm install react-responsive-modal --save`

Or with yarn: `yarn add react-responsive-modal`

## Usage

[![Edit react-responsive-modal](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/9jxp669j2o)

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';

export default class App extends React.Component {
  state = {
    open: false,
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

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

- `open`: (Bool) __Required__ Control if the modal is open or not.
- `onClose`: (Function) __Required__ Fired when the Modal is requested to be closed by a click on the overlay or when user press esc key.
- `closeOnEsc`: (Bool) default: true is the modal closable when user press esc key.
- `closeOnOverlayClick`: (Bool) default: true is the modal closable when user click on overlay.
- `little`: (Bool) Is the dialog centered __When you don't have a lot of content__.
- `showCloseIcon`: (Bool) default: true Show the close icon.
- `closeIconSize`: (Number) default: 28 Close icon size.
- `children`: (Node) The content of the modal.
- `overlayClassName`: (String) Classname for overlay div.
- `modalClassName`: (String) Classname for modal content div.
- `closeIconClassName`: (String) Classname for close icon svg.
- `overlayStyle`: (Object) Inline style for overlay div.
- `modalStyle`: (Object) Inline style for modal content div.
