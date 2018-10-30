import React from 'react';
import Modal from '../../src';

export default class FocusTrapped extends React.Component {
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
        <button className="btn btn-action" onClick={this.onOpenModal}>
          Open
        </button>{' '}
        <a
          href="https://github.com/pradel/react-responsive-modal/blob/master/docs/examples/focus-trapped.js"
          target="_blank"
          rel="noopener noreferrer"
        >
          See source code
        </a>
        <Modal open={open} onClose={this.onCloseModal} focusTrapped>
          <h2>Try tabbing/shift-tabbing thru elements</h2>
          <form action="">
            <p>
              <label htmlFor="firstName">
                First name
                <input type="text" />
              </label>
            </p>
            <p>
              <label htmlFor="lastName">
                Last name
                <input type="text" />
              </label>
            </p>
            <button>test</button>
            <input type="submit" value="Submit" />
          </form>
        </Modal>
      </div>
    );
  }
}
