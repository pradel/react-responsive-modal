# react-responsive-modal

[![npm version](https://badge.fury.io/js/react-responsive-modal.svg)](https://badge.fury.io/js/react-responsive-modal)
[![npm](https://img.shields.io/npm/dm/react-responsive-modal.svg)](https://www.npmjs.com/package/react-responsive-modal)
[![Build Status](https://travis-ci.org/pradel/react-responsive-modal.svg?branch=master)](https://travis-ci.org/pradel/react-responsive-modal)
[![dependencies Status](https://david-dm.org/pradel/react-responsive-modal/status.svg)](https://david-dm.org/pradel/react-responsive-modal)

A simple responsive react modal.

* Centered modals.
* Scrolling modals.
* Multiple modals.
* Easily customizable via props.

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

| Property            |   Type   | Default | Description                                                                                                                                                                                           |
| ------------------- | :------: | :-----: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **open\***          | Boolean  |         | Control if the modal is open or not.                                                                                                                                                                  |
| **onClose\***       | Function |         | Fired when the Modal is requested to be closed by a click on the overlay or when user press esc key.                                                                                                  |
| children            |   Node   |         | The content of the modal.                                                                                                                                                                             |
| closeOnEsc          | Boolean  |  true   | Is the modal closable when user press esc key.                                                                                                                                                        |
| closeOnOverlayClick | Boolean  |  true   | Is the modal closable when user click on overlay.                                                                                                                                                     |
| little              | Boolean  |  false  | Is the dialog centered (**when you don't have a lot of content**).                                                                                                                                    |
| showCloseIcon       | Boolean  |  true   | Show the close icon.                                                                                                                                                                                  |
| closeIconSize       |  Number  |   28    | Close icon size.                                                                                                                                                                                      |
| closeIconSvgPath    |   Node   |         | A valid svg path to show as icon.                                                                                                                                                                     |
| classNames          |  Object  |   {}    | An object containing classNames to style the modal, can have properties 'overlay' (classname for overlay div), 'modal' (classname for modal content div), 'closeIcon' (classname for close icon svg). |
| styles              |  Object  |   {}    | An object containing the styles objects to style the modal, can have properties 'overlay', 'modal', 'closeIcon'.                                                                                      |
| animationDuration   |  Number  |   500   | Animation duration in milliseconds.                                                                                                                                                                   |

## License

MIT © [Léo Pradel](https://www.leopradel.com/)
