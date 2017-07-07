// eslint-disable-next-line
import React from 'react';
import { Helmet } from 'react-helmet';
import Modal from '../../../src/modal';
import '../css/normalize.css';
import '../css/stylesheet.css';
import '../css/github-light.css';
import '../css/style.css';

const propsLib = [
  {
    name: 'open',
    type: 'Bool',
    required: true,
    description: 'Control if the modal is open or not.',
  },
  {
    name: 'onClose',
    type: 'Function',
    required: true,
    description:
      'Fired when the Modal is requested to be closed by a click on the overlay or when user press esc key.',
  },
  {
    name: 'closeOnEsc',
    type: 'Bool',
    description: 'default: true is the modal closable when user press esc key.',
  },
  {
    name: 'closeOnOverlayClick',
    type: 'Bool',
    description:
      'default: true is the modal closable when user click on overlay.',
  },
  {
    name: 'little',
    type: 'Bool',
    description: "Is the dialog centered When you don't have a lot of content",
  },
  {
    name: 'showCloseIcon',
    type: 'Bool',
    description: 'default: true Show the close icon.',
  },
  {
    name: 'closeIconSize',
    type: 'Number',
    description: 'default: 28 Close icon size.',
  },
  {
    name: 'children',
    type: 'Node',
    description: 'The content of the modal.',
  },
  {
    name: 'overlayClassName',
    type: 'String',
    description: 'Classname for overlay div.',
  },
  {
    name: 'modalClassName',
    type: 'String',
    description: 'Classname for modal content div.',
  },
  {
    name: 'closeIconClassName',
    type: 'String',
    description: 'Classname for close icon svg.',
  },
  {
    name: 'overlayStyle',
    type: 'Object',
    description: 'Inline style for overlay div.',
  },
  {
    name: 'modalStyle',
    type: 'Object',
    description: 'Inline style for modal content div.',
  },
];

export default class ModalDemo extends React.Component {
  constructor(props) {
    super(props);
    this.onOpenSimpleModal = this.onOpenSimpleModal.bind(this);
    this.onCloseSimpleModal = this.onCloseSimpleModal.bind(this);
    this.onOpenBigModal = this.onOpenBigModal.bind(this);
    this.onCloseBigModal = this.onCloseBigModal.bind(this);
    this.onOpenFirstModal = this.onOpenFirstModal.bind(this);
    this.onCloseFirstModal = this.onCloseFirstModal.bind(this);
    this.onOpenSecondModal = this.onOpenSecondModal.bind(this);
    this.onCloseSecondModal = this.onCloseSecondModal.bind(this);
    this.state = {
      openSimpleModal: false,
      openBigModal: false,
      openFirstModal: false,
      openSecondModal: false,
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

  onOpenFirstModal() {
    this.setState({ openFirstModal: true });
  }

  onCloseFirstModal() {
    this.setState({ openFirstModal: false });
  }

  onOpenSecondModal() {
    this.setState({ openSecondModal: true });
  }

  onCloseSecondModal() {
    this.setState({ openSecondModal: false });
  }

  render() {
    const {
      openSimpleModal,
      openBigModal,
      openFirstModal,
      openSecondModal,
    } = this.state;
    const littleLorem = (
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar
        risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit
        risus, sed porttitor quam.
      </p>
    );
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
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>react-responsive-modal</title>
          <meta
            name="description"
            content="Simple responsive modal for react"
          />
        </Helmet>
        <section className="page-header">
          <h1 className="project-name">react-responsive-modal</h1>
          <h2 className="project-tagline">Simple responsive modal for react</h2>
          <a
            href="https://github.com/pradel/react-responsive-modal"
            className="btn"
          >
            View on GitHub
          </a>
        </section>

        <section className="main-content">
          <h2>
            <a
              id="example"
              className="anchor"
              href="#example"
              aria-hidden="true"
            >
              <span className="octicon octicon-link" />
            </a>
            Demo
          </h2>

          <button className="btn btn-action" onClick={this.onOpenSimpleModal}>
            Open centered modal
          </button>
          <Modal
            open={openSimpleModal}
            onClose={this.onCloseSimpleModal}
            little
          >
            <h2>Simple centered modal</h2>
            {littleLorem}
          </Modal>

          <button className="btn btn-action" onClick={this.onOpenBigModal}>
            Open big modal
          </button>
          <Modal open={openBigModal} onClose={this.onCloseBigModal}>
            <h2>Big modal</h2>
            {lorem}
            {lorem}
            {lorem}
            {lorem}
            {lorem}
            {lorem}
          </Modal>

          <button className="btn btn-action" onClick={this.onOpenFirstModal}>
            Open multiple modals
          </button>
          <Modal open={openFirstModal} onClose={this.onCloseFirstModal} little>
            <p>First modal</p>
            {littleLorem}
            <button className="btn btn-action" onClick={this.onOpenSecondModal}>
              Open second modal
            </button>
          </Modal>
          <Modal
            open={openSecondModal}
            onClose={this.onCloseSecondModal}
            little
          >
            <p>Second modal</p>
            {littleLorem}
          </Modal>

          <h2>
            <a
              id="installation"
              className="anchor"
              href="#installation"
              aria-hidden="true"
            >
              <span className="octicon octicon-link" />
            </a>
            Installation
          </h2>

          <pre>
            <code>npm install --save react-responsive-modal</code>
          </pre>

          <h2>Props</h2>

          <ul>
            {propsLib.map(prop =>
              <li key={prop.name}>
                <code>{prop.name}</code>: ({prop.type}){' '}
                {prop.required && <b>Required</b>} {prop.description}
              </li>
            )}
          </ul>

          <footer className="site-footer">
            <span className="site-footer-owner">
              <a href="https://github.com/pradel/react-responsive-modal">
                react-responsive-modal
              </a>{' '}
              is maintained by <a href="https://github.com/pradel">pradel</a>.
            </span>

            <span className="site-footer-credits">
              This page is using the{' '}
              <a href="https://github.com/jasonlong/cayman-theme">
                Cayman theme
              </a>{' '}
              by <a href="https://twitter.com/jasonlong">Jason Long</a>.
            </span>
          </footer>
        </section>
      </div>
    );
  }
}
