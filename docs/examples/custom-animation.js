import React from 'react';
import Modal from '../../src';
import styles from './custom-animation.css';

export default class CustomAnimation extends React.Component {
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
        <h4>Custom animation</h4>
        <button className="btn btn-action" onClick={this.onOpenModal}>
          Open
        </button>{' '}
        <a
          href="https://github.com/pradel/react-responsive-modal/blob/master/docs/examples/custom-animation.js"
          target="_blank"
          rel="noopener noreferrer"
        >
          See source code
        </a>
        <Modal
          open={open}
          onClose={this.onCloseModal}
          center
          classNames={{
            transitionEnter: styles.transitionEnter,
            transitionEnterActive: styles.transitionEnterActive,
            transitionExit: styles.transitionExitActive,
            transitionExitActive: styles.transitionExitActive,
          }}
          animationDuration={1000}
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
            hendrerit risus, sed porttitor quam.
          </p>
        </Modal>
      </div>
    );
  }
}
