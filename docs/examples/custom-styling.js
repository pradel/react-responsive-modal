import React from 'react';
import Modal from '../../src';
import styles from './custom-styling.css';

export default class CustomStyling extends React.Component {
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
      <div className="example">
        <h4>Custom styling</h4>
        <button className="btn btn-action" onClick={this.onOpenModal}>
          Open
        </button>{' '}
        <a
          href="https://github.com/pradel/react-responsive-modal/blob/master/docs/examples/custom-styling.js"
          target="_blank"
        >
          See source code
        </a>
        <Modal
          open={open}
          onClose={this.onCloseModal}
          center
          classNames={{
            overlay: styles.customOverlay,
            modal: styles.customModal,
          }}
        >
          <h2>Modal</h2>
        </Modal>
      </div>
    );
  }
}
