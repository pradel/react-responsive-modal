import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Portal from 'react-minimalist-portal';
import CSSTransition from 'react-transition-group/CSSTransition';
import cx from 'classnames';
import noScroll from 'no-scroll';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPortal: props.open,
    };
  }

  componentDidMount() {
    if (this.props.closeOnEsc) {
      document.addEventListener('keydown', this.handleKeydown);
    }
    // Block scroll when initial prop is open
    if (this.props.open) {
      this.blockScroll();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.open && nextProps.open) {
      this.setState(
        {
          showPortal: true,
        },
        () => {
          this.blockScroll();
        }
      );
    }
  }

  componentWillUnmount() {
    if (this.props.closeOnEsc) {
      document.removeEventListener('keydown', this.handleKeydown);
    }
    this.unblockScroll();
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  onClickOverlay = e => {
    const { classes, closeOnOverlayClick } = this.props;
    if (!closeOnOverlayClick || typeof e.target.className !== 'string') {
      return;
    }
    const className = e.target.className.split(' ');
    if (className.indexOf(classes.overlay) !== -1 && !this.isScrollBarClick(e)) {
      e.stopPropagation();
      this.props.onClose();
    }
  };

  onClickCloseIcon = e => {
    e.stopPropagation();
    this.props.onClose();
  };

  isScrollBarClick = e => e.clientX >= document.documentElement.offsetWidth;

  handleKeydown = e => {
    if (e.keyCode === 27) {
      this.props.onClose();
    }
  };

  handleExited = () => {
    this.setState({ showPortal: false });
    this.unblockScroll();
  };

  // eslint-disable-next-line class-methods-use-this
  blockScroll() {
    noScroll.on();
  }

  unblockScroll = () => {
    const openedModals = document.getElementsByClassName(
      this.props.classes.modal
    );
    if (openedModals.length === 1) {
      noScroll.off();
    }
  };

  render() {
    const {
      open,
      little,
      classes,
      classNames,
      styles,
      showCloseIcon,
      closeIconSize,
      closeIconSvgPath,
      animationDuration,
    } = this.props;
    const { showPortal } = this.state;
    if (!showPortal) return null;
    return (
      <Portal>
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
          onExited={this.handleExited}
        >
          <div
            className={cx(
              classes.overlay,
              little ? classes.overlayLittle : null,
              classNames.overlay
            )}
            onMouseDown={this.onClickOverlay}
            style={styles.overlay}
          >
            <div
              className={cx(classes.modal, classNames.modal)}
              style={styles.modal}
            >
              {showCloseIcon ? (
                <svg
                  className={cx(classes.closeIcon, classNames.closeIcon)}
                  style={styles.closeIcon}
                  onClick={this.onClickCloseIcon}
                  xmlns="http://www.w3.org/2000/svg"
                  width={closeIconSize}
                  height={closeIconSize}
                  viewBox="0 0 36 36"
                >
                  {closeIconSvgPath}
                </svg>
              ) : null}
              {this.props.children}
            </div>
          </div>
        </CSSTransition>
      </Portal>
    );
  }
}

Modal.propTypes = {
  closeOnEsc: PropTypes.bool,
  closeOnOverlayClick: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  classNames: PropTypes.object,
  styles: PropTypes.object,
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  little: PropTypes.bool,
  showCloseIcon: PropTypes.bool,
  closeIconSize: PropTypes.number,
  closeIconSvgPath: PropTypes.node,
  animationDuration: PropTypes.number,
};

Modal.defaultProps = {
  closeOnEsc: true,
  closeOnOverlayClick: true,
  showCloseIcon: true,
  closeIconSize: 28,
  closeIconSvgPath: (
    <path d="M28.5 9.62L26.38 7.5 18 15.88 9.62 7.5 7.5 9.62 15.88 18 7.5 26.38l2.12 2.12L18 20.12l8.38 8.38 2.12-2.12L20.12 18z" />
  ),
  classNames: {},
  styles: {},
  children: null,
  little: false,
  animationDuration: 500,
};

export default Modal;
