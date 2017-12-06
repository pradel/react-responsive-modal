import React from 'react';
import Modal from './modal';

export default function ReactResponsiveModalCss({ ...props }) {
  return (
    <Modal
      classes={{
        overlay: 'react-responsive-modal-overlay',
        overlayLittle: 'react-responsive-modal-overlay-little',
        modal: 'react-responsive-modal-modal',
        closeIcon: 'react-responsive-modal-close-icon',
        transitionEnter: 'react-responsive-modal-transition-enter',
        transitionEnterActive: 'react-responsive-modal-transition-enter-active',
        transitionExit: 'react-responsive-modal-transition-exit',
        transitionExitActive: 'react-responsive-modal-transition-exit-active',
      }}
      {...props}
    />
  );
}
