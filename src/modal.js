import React, { Component, PropTypes } from 'react';
import Portal from 'react-minimalist-portal';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classNames from 'classnames';
import injectSheet from 'react-jss';
import styles from './styles';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.onClickOverlay = this.onClickOverlay.bind(this);
    this.onClickCloseIcon = this.onClickCloseIcon.bind(this);
    this.state = {
      showPortal: props.open,
      open: props.open,
    };
  }

  componentDidMount() {
    if (this.props.closeOnEsc) {
      document.addEventListener('keydown', this.handleKeydown);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.open && nextProps.open) {
      this.setState({
        open: true,
        showPortal: true,
        previousBodyStyleOverflow: document.body.style.overflow,
      },
      () => {
        document.body.style.overflow = 'hidden';
      });
    }
    if (this.props.open && !nextProps.open) {
      this.setState({ open: false });
      // Let the animation finish
      this.timeout = setTimeout(() => {
        this.setState({ showPortal: false });
        document.body.style.overflow = this.state.previousBodyStyleOverflow;
      }, 500);
    }
  }

  componentWillUnmount() {
    if (this.props.closeOnEsc) {
      document.removeEventListener('keydown', this.handleKeydown);
    }
    document.body.style.overflow = this.state.previousBodyStyleOverflow;
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  onClickOverlay(e) {
    const { sheet: { classes }, closeOnOverlayClick } = this.props;
    if (!closeOnOverlayClick) return;
    const className = e.target.className.split(' ');
    if (className.indexOf(classes.overlay) !== -1) {
      e.stopPropagation();
      this.props.onClose();
    }
  }

  onClickCloseIcon(e) {
    e.stopPropagation();
    this.props.onClose();
  }

  handleKeydown(e) {
    if (e.keyCode === 27) {
      this.props.onClose();
    }
  }

  render() {
    const {
      little,
      sheet: { classes },
      overlayClassName,
      modalClassName,
      closeIconClassName,
      overlayStyle,
      modalStyle,
      showCloseIcon,
      closeIconSize,
    } = this.props;
    const { open, showPortal } = this.state;
    if (!showPortal) return null;
    return (
      <Portal>
        <ReactCSSTransitionGroup
          transitionName={{
            appear: classes.transitionEnter,
            appearActive: classes.transitionEnterActive,
            enter: classes.transitionEnter,
            enterActive: classes.transitionEnterActive,
            leave: classes.transitionLeave,
            leaveActive: classes.transitionLeaveActive,
          }}
          transitionAppear
          transitionLeave
          transitionAppearTimeout={500}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {open &&
            <div
              className={
                classNames(classes.overlay, little ? classes.overlayLittle : null, overlayClassName)
              }
              onClick={this.onClickOverlay}
              style={overlayStyle}
            >
              <div className={classNames(classes.modal, modalClassName)} style={modalStyle}>
                {showCloseIcon ?
                  <svg className={classNames(classes.closeIcon, closeIconClassName)} onClick={this.onClickCloseIcon} xmlns="http://www.w3.org/2000/svg" width={closeIconSize} height={closeIconSize} viewBox="0 0 36 36"><path d="M28.5 9.62L26.38 7.5 18 15.88 9.62 7.5 7.5 9.62 15.88 18 7.5 26.38l2.12 2.12L18 20.12l8.38 8.38 2.12-2.12L20.12 18z" /></svg>
                  : null}
                {this.props.children}
              </div>
            </div>
          }
        </ReactCSSTransitionGroup>
      </Portal>
    );
  }
}

Modal.propTypes = {
  closeOnEsc: PropTypes.bool,
  closeOnOverlayClick: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  overlayClassName: PropTypes.string,
  modalClassName: PropTypes.string,
  closeIconClassName: PropTypes.string,
  overlayStyle: PropTypes.object,
  modalStyle: PropTypes.object,
  children: PropTypes.node,
  sheet: PropTypes.object,
  little: PropTypes.bool,
  showCloseIcon: PropTypes.bool,
  closeIconSize: PropTypes.number,
};

Modal.defaultProps = {
  closeOnEsc: true,
  closeOnOverlayClick: true,
  showCloseIcon: true,
  closeIconSize: 28,
};

export default injectSheet(styles)(Modal);
