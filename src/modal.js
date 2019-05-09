import React, { Component } from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import CSSTransition from 'react-transition-group/CSSTransition';
import cx from 'classnames';
import noScroll from 'no-scroll';
import FocusTrap from 'focus-trap-react';
import CloseIcon from './close-icon';
import modalManager from './modal-manager';
import cssClasses from './styles.css';

const isBrowser = typeof window !== 'undefined';

class Modal extends Component {
  static blockScroll() {
    noScroll.on();
  }

  static unblockScroll = () => {
    // Restore the scroll only if there is no modal on the screen
    if (modalManager.modals().length === 0) {
      noScroll.off();
    }
  };

  shouldClose = null;

  constructor(props) {
    super(props);
    this.container = isBrowser && document.createElement('div');
    this.state = {
      showPortal: this.props.open,
    };
  }

  componentDidMount() {
    // Block scroll when initial prop is open
    if (this.props.open) {
      this.handleOpen();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.showPortal && !this.state.showPortal) {
      this.handleClose();
    } else if (!prevProps.open && this.props.open) {
      this.handleOpen();
    }
  }

  componentWillUnmount() {
    if (this.state.showPortal) {
      this.handleClose();
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState.showPortal && nextProps.open) {
      return {
        showPortal: true,
      };
    }
    return null;
  }

  handleOpen = () => {
    modalManager.add(this);
    if (isBrowser && !this.props.container) {
      document.body.appendChild(this.container);
    }
    if (this.props.blockScroll) {
      Modal.blockScroll();
    }
    document.addEventListener('keydown', this.handleKeydown);
  };

  handleClose = () => {
    modalManager.remove(this);
    if (this.props.blockScroll) {
      Modal.unblockScroll();
    }
    if (isBrowser && !this.props.container) {
      document.body.removeChild(this.container);
    }
    document.removeEventListener('keydown', this.handleKeydown);
  };

  handleClickOverlay = event => {
    if (this.shouldClose === null) {
      this.shouldClose = true;
    }

    if (!this.shouldClose) {
      this.shouldClose = null;
      return;
    }

    if (this.props.onOverlayClick) {
      this.props.onOverlayClick(event);
    }

    if (this.props.closeOnOverlayClick) {
      this.props.onClose(event);
    }

    this.shouldClose = null;
  };

  handleClickCloseIcon = event => {
    this.props.onClose(event);
  };

  handleKeydown = event => {
    // Only the last modal need to be escaped when pressing the esc key
    if (event.keyCode !== 27 || !modalManager.isTopModal(this)) {
      return;
    }

    if (this.props.onEscKeyDown) {
      this.props.onEscKeyDown(event);
    }

    if (this.props.closeOnEsc) {
      this.props.onClose(event);
    }
  };

  handleModalEvent = () => {
    this.shouldClose = false;
  };

  handleEntered = () => {
    if (this.props.onEntered) {
      this.props.onEntered();
    }
  };

  handleExited = () => {
    if (this.props.onExited) {
      this.props.onExited();
    }

    this.setState({ showPortal: false });

    if (this.props.blockScroll) {
      Modal.unblockScroll();
    }
  };

  render() {
    const {
      open,
      center,
      classes,
      classNames,
      styles,
      showCloseIcon,
      closeIconSize,
      closeIconSvgPath,
      animationDuration,
      focusTrapped,
      focusTrapOptions,
      overlayId,
      modalId,
      closeIconId,
      role,
      ariaLabelledby,
      ariaDescribedby,
    } = this.props;
    const { showPortal } = this.state;

    if (!showPortal) {
      return null;
    }

    const content = (
      <React.Fragment>
        {this.props.children}
        {showCloseIcon && (
          <CloseIcon
            classes={classes}
            classNames={classNames}
            styles={styles}
            closeIconSize={closeIconSize}
            closeIconSvgPath={closeIconSvgPath}
            onClickCloseIcon={this.handleClickCloseIcon}
            id={closeIconId}
          />
        )}
      </React.Fragment>
    );

    return ReactDom.createPortal(
      <CSSTransition
        in={open}
        appear
        classNames={{
          appear: classNames.transitionEnter || classes.transitionEnter,
          appearActive:
            classNames.transitionEnterActive || classes.transitionEnterActive,
          enter: classNames.transitionEnter || classes.transitionEnter,
          enterActive:
            classNames.transitionEnterActive || classes.transitionEnterActive,
          exit: classNames.transitionExit || classes.transitionExit,
          exitActive:
            classNames.transitionExitActive || classes.transitionExitActive,
        }}
        timeout={animationDuration}
        onEntered={this.handleEntered}
        onExited={this.handleExited}
      >
        <div
          className={cx(classes.overlay, classNames.overlay)}
          onClick={this.handleClickOverlay}
          style={styles.overlay}
          id={overlayId}
        >
          <div
            className={cx(
              classes.modal,
              center && classes.modalCenter,
              classNames.modal
            )}
            style={styles.modal}
            onMouseDown={this.handleModalEvent}
            onMouseUp={this.handleModalEvent}
            onClick={this.handleModalEvent}
            id={modalId}
            role={role}
            aria-modal="true"
            aria-labelledby={ariaLabelledby}
            aria-describedby={ariaDescribedby}
          >
            {focusTrapped ? (
              <FocusTrap
                focusTrapOptions={{
                  ...{ clickOutsideDeactivates: true },
                  ...focusTrapOptions,
                }}
              >
                {content}
              </FocusTrap>
            ) : (
              content
            )}
          </div>
        </div>
      </CSSTransition>,
      this.props.container || this.container
    );
  }
}

Modal.propTypes = {
  /**
   * Is the modal closable when user press esc key.
   */
  closeOnEsc: PropTypes.bool,
  /**
   * Is the modal closable when user click on overlay.
   */
  closeOnOverlayClick: PropTypes.bool,
  /**
   * Callback fired when the Modal is open and the animation is finished.
   */
  onEntered: PropTypes.func,
  /**
   * Callback fired when the Modal has exited and the animation is finished.
   */
  onExited: PropTypes.func,
  /**
   * Callback fired when the Modal is requested to be closed by a click on the overlay or when user press esc key.
   */
  onClose: PropTypes.func.isRequired,
  /**
   * Callback fired when the escape key is pressed.
   */
  onEscKeyDown: PropTypes.func,
  /**
   * Callback fired when the overlay is clicked.
   */
  onOverlayClick: PropTypes.func,
  /**
   * Control if the modal is open or not.
   */
  open: PropTypes.bool.isRequired,
  /**
   * An object containing classNames to style the modal, can have properties 'overlay' (classname for overlay div), 'modal' (classname for modal content div), 'closeButton' (classname for the button that contain the close icon), 'closeIcon' (classname for close icon svg). You can customize the transition with 'transitionEnter', 'transitionEnterActive', 'transitionExit', 'transitionExitActive'
   */
  classNames: PropTypes.object,
  /**
   * An object containing the styles objects to style the modal, can have properties 'overlay', 'modal', 'closeButton', 'closeIcon'.
   */
  styles: PropTypes.object,
  /**
   * The content of the modal.
   */
  children: PropTypes.node,
  /**
   * @internal
   */
  classes: PropTypes.object,
  /**
   * Should the dialog be centered.
   */
  center: PropTypes.bool,
  /**
   * Show the close icon.
   */
  showCloseIcon: PropTypes.bool,
  /**
   * Close icon size.
   */
  closeIconSize: PropTypes.number,
  /**
   * A valid svg path to show as icon.
   */
  closeIconSvgPath: PropTypes.node,
  /**
   * Animation duration in milliseconds.
   */
  animationDuration: PropTypes.number,
  /**
   * You can specify a container prop which should be of type `Element`. The portal will be rendered inside that element. The default behavior will create a div node and render it at the at the end of document.body.
   */
  container: PropTypes.object, // eslint-disable-line
  /**
   * Whether to block scrolling when dialog is open
   */
  blockScroll: PropTypes.bool,
  /**
   * When the modal is open, trap focus within it
   */
  focusTrapped: PropTypes.bool,
  /**
   * Options to be passed to the focus trap, details available at https://github.com/davidtheclark/focus-trap#focustrap--createfocustrapelement-createoptions
   */
  focusTrapOptions: PropTypes.object,
  /**
   * id attribute for overlay
   */
  overlayId: PropTypes.string,
  /**
   * id attribute for modal
   */
  modalId: PropTypes.string,
  /**
   * id attribute for close icon
   */
  closeIconId: PropTypes.string,
  /**
   * ARIA role for modal
   */
  role: PropTypes.string,
  /**
   * ARIA label for modal
   */
  ariaLabelledby: PropTypes.string,
  /**
   * ARIA description for modal
   */
  ariaDescribedby: PropTypes.string,
};

Modal.defaultProps = {
  classes: cssClasses,
  closeOnEsc: true,
  closeOnOverlayClick: true,
  onEntered: undefined,
  onExited: undefined,
  onEscKeyDown: undefined,
  onOverlayClick: undefined,
  showCloseIcon: true,
  closeIconSize: 28,
  closeIconSvgPath: (
    <path d="M28.5 9.62L26.38 7.5 18 15.88 9.62 7.5 7.5 9.62 15.88 18 7.5 26.38l2.12 2.12L18 20.12l8.38 8.38 2.12-2.12L20.12 18z" />
  ),
  classNames: {},
  styles: {},
  children: null,
  center: false,
  animationDuration: 500,
  blockScroll: true,
  focusTrapped: true,
  focusTrapOptions: {},
  overlayId: undefined,
  modalId: undefined,
  closeIconId: undefined,
  role: 'dialog',
  ariaLabelledby: undefined,
  ariaDescribedby: undefined,
};

export default Modal;
