import React, { Component } from 'react';
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
    if (nextProps.open) {
      document.body.style.overflow = 'hidden';
      this.setState({ open: true, showPortal: true });
    }
    if (this.props.open && !nextProps.open) {
      this.setState({ open: false });
      // Let the animation finish
      this.timeout = setTimeout(() => {
        this.setState({ showPortal: false });
        document.body.style.overflow = null;
      }, 500);
    }
  }

  componentWillUnmount() {
    if (this.props.closeOnEsc) {
      document.removeEventListener('keydown', this.handleKeydown);
    }
    document.body.style.overflow = null;
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
                  <svg className={classNames(classes.closeIcon, closeIconClassName)} onClick={this.onClickCloseIcon} xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><path d="M28.5 9.62L26.38 7.5 18 15.88 9.62 7.5 7.5 9.62 15.88 18 7.5 26.38l2.12 2.12L18 20.12l8.38 8.38 2.12-2.12L20.12 18z" /></svg>
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
  closeOnEsc: React.PropTypes.bool,
  closeOnOverlayClick: React.PropTypes.bool,
  onClose: React.PropTypes.func.isRequired,
  open: React.PropTypes.bool.isRequired,
  overlayClassName: React.PropTypes.string,
  modalClassName: React.PropTypes.string,
  closeIconClassName: React.PropTypes.string,
  overlayStyle: React.PropTypes.object,
  modalStyle: React.PropTypes.object,
  children: React.PropTypes.node,
  sheet: React.PropTypes.object,
  little: React.PropTypes.bool,
  showCloseIcon: React.PropTypes.bool,
};

Modal.defaultProps = {
  closeOnEsc: true,
  closeOnOverlayClick: true,
  showCloseIcon: true,
};

export default injectSheet(styles)(Modal);
