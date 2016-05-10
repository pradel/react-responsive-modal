import React from 'react';
import Portal from 'react-minimalist-portal';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classNames from 'classnames';
import { create } from 'jss';
import reactJss from 'react-jss';
import camelCase from 'jss-camel-case';
import px from 'jss-px';
import vendorPrefixer from 'jss-vendor-prefixer';
import styles from './styles';

export const jss = create();
export const useSheet = reactJss(jss);
jss.use(camelCase());
jss.use(px());
jss.use(vendorPrefixer());

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.onClickOverlay = this.onClickOverlay.bind(this);
    this.state = {
      showPortal: false,
      open: false,
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
      setTimeout(() => {
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
            >
              <div className={classNames(classes.modal, modalClassName)}>
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
  onClose: React.PropTypes.func,
  open: React.PropTypes.bool,
  overlayClassName: React.PropTypes.string,
  modalClassName: React.PropTypes.string,
  children: React.PropTypes.node,
  classes: React.PropTypes.object,
  sheet: React.PropTypes.object,
  little: React.PropTypes.bool,
};

Modal.defaultProps = {
  closeOnEsc: true,
  closeOnOverlayClick: true,
};

export default useSheet(Modal, styles);
