import React from 'react';
import Modal from 'react-responsive-modal';

export default class CustomContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.myRef = React.createRef();
  }

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
        <h4>Custom container</h4>
        <div ref={this.myRef} />
        <button className="btn btn-action" onClick={this.onOpenModal}>
          Open
        </button>{' '}
        <a
          href="https://github.com/pradel/react-responsive-modal/blob/master/docs/src/examples/custom-container.js"
          target="_blank"
        >
          See source code
        </a>
        <Modal
          open={open}
          onClose={this.onCloseModal}
          center
          container={this.myRef.current}
        >
          <p>
            Take a look with the devtools you will see that this modal is
            rendered in a custom container.
          </p>
        </Modal>
      </div>
    );
  }
}
