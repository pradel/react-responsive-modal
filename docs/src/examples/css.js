import React from 'react';
import Modal from '../../../src/css';
import '../../../lib/react-responsive-modal.css';

export default class Css extends React.Component {
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
        <h4>Css modal</h4>
        <button className="btn btn-action" onClick={this.onOpenModal}>
          Open
        </button>{' '}
        <a
          href="https://github.com/pradel/react-responsive-modal/blob/master/docs/src/examples/css.js"
          target="_blank"
        >
          See source code
        </a>
        <Modal open={open} onClose={this.onCloseModal} little>
          <h2>Simple centered modal</h2>
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
