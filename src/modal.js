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
      open: false,
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open) {
      document.body.style.overflow = 'hidden';
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeydown);
    document.body.style.overflow = null;
  }

  onClickOverlay(e) {
    const { sheet: { classes } } = this.props;
    const className = e.target.className.split(' ');
    if (className.indexOf(classes.modal) !== -1) {
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
    const { open, little, sheet: { classes } } = this.props;
    if (!open) return null;
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
          <div
            className={little ? classNames(classes.modal, classes.modalLittle) : classes.modal}
            onClick={this.onClickOverlay}
          >
            <div className={classes.dialog}>
              <div className={classes.content}>
               {this.props.children}
              </div>
            </div>
          </div>
        </ReactCSSTransitionGroup>
      </Portal>
    );
  }
}

Modal.propTypes = {
  onClose: React.PropTypes.func,
  open: React.PropTypes.bool,
  className: React.PropTypes.string,
  children: React.PropTypes.node,
  classes: React.PropTypes.object,
  sheet: React.PropTypes.object,
  little: React.PropTypes.bool,
};

export default useSheet(Modal, styles);
