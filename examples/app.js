import React from 'react';
import ReactDOM from 'react-dom';
import Modal from '../src/modal';

class ModalDemo extends React.Component {
  constructor(props) {
    super(props);
    this.onOpenSimpleModal = this.onOpenSimpleModal.bind(this);
    this.onCloseSimpleModal = this.onCloseSimpleModal.bind(this);
    this.onOpenBigModal = this.onOpenBigModal.bind(this);
    this.onCloseBigModal = this.onCloseBigModal.bind(this);
    this.state = {
      openSimpleModal: false,
      openBigModal: false,
    };
  }

  onOpenSimpleModal() {
    this.setState({ openSimpleModal: true });
  }

  onCloseSimpleModal() {
    this.setState({ openSimpleModal: false });
  }

  onOpenBigModal() {
    this.setState({ openBigModal: true });
  }

  onCloseBigModal() {
    this.setState({ openBigModal: false });
  }

  render() {
    const { openSimpleModal, openBigModal } = this.state;
    const lorem = (<p>
      Mauris ac arcu sit amet dui interdum bibendum a sed diam. Praesent rhoncus congue ipsum
      elementum lobortis. Ut ligula purus, ultrices id condimentum quis, tincidunt quis purus.
      Proin quis enim metus. Nunc feugiat odio at eros porta, ut rhoncus lorem tristique. Nunc
      et ipsum eu ex vulputate consectetur vel eu nisi. Donec ultricies rutrum lectus, sit ame
      feugiat est semper vitae. Proin varius imperdiet consequat. Proin eu metus nisi. In hac
      habitasse platea dictumst. Vestibulum ac ultrices risus. Pellentesque arcu sapien,
      aliquet sed orci sit amet, pulvinar interdum velit. Nunc a rhoncus ipsum, maximus
      fermentum dolor. Praesent aliquet justo vitae rutrum volutpat. Ut quis pulvinar est.
    </p>);
    return (
      <div>
        <button onClick={this.onOpenSimpleModal}>
          Open centered modal
        </button>
        <button onClick={this.onOpenBigModal}>
          Open big modal
        </button>

        <Modal open={openSimpleModal} onClose={this.onCloseSimpleModal} little>
          <h2>Simple centered modal</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non
            risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.
          </p>
        </Modal>

        <Modal open={openBigModal} onClose={this.onCloseBigModal}>
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

ReactDOM.render(<ModalDemo />, document.getElementById('demo'));
