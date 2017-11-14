import React from 'react';
import Modal from '../../../src/modal';

export default class Big extends React.Component {
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
    const lorem = (
      <p>
        Mauris ac arcu sit amet dui interdum bibendum a sed diam. Praesent
        rhoncus congue ipsum elementum lobortis. Ut ligula purus, ultrices id
        condimentum quis, tincidunt quis purus. Proin quis enim metus. Nunc
        feugiat odio at eros porta, ut rhoncus lorem tristique. Nunc et ipsum eu
        ex vulputate consectetur vel eu nisi. Donec ultricies rutrum lectus, sit
        ame feugiat est semper vitae. Proin varius imperdiet consequat. Proin eu
        metus nisi. In hac habitasse platea dictumst. Vestibulum ac ultrices
        risus. Pellentesque arcu sapien, aliquet sed orci sit amet, pulvinar
        interdum velit. Nunc a rhoncus ipsum, maximus fermentum dolor. Praesent
        aliquet justo vitae rutrum volutpat. Ut quis pulvinar est.
      </p>
    );
    return (
      <div className="example">
        <h4>Big modal</h4>
        <button className="btn btn-action" onClick={this.onOpenModal}>
          Open
        </button>{' '}
        <a
          href="https://github.com/pradel/react-responsive-modal/blob/master/docs/src/examples/big.js"
          target="_blank"
        >
          See source code
        </a>
        <Modal open={open} onClose={this.onCloseModal}>
          <h2>Big modal</h2>
          {lorem}
          {lorem}
          {lorem}
          {lorem}
          {lorem}
          {lorem}
        </Modal>
      </div>
    );
  }
}
