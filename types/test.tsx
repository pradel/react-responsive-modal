import * as React from 'react';
import Modal from 'react-responsive-modal';

const onClose = () => null;
const open = true;

function SimpleModal() {
  return <Modal onClose={onClose} open={open} />;
}

function PropsModal() {
  return (
    <Modal
      onClose={onClose}
      open={open}
      closeOnEsc={true}
      center={true}
      showCloseIcon={true}
      closeIconSize={20}
      animationDuration={20}
      onEntered={() => null}
      onExited={() => null}
      onEscKeyDown={() => null}
      onOverlayClick={() => null}
      classNames={{}}
      styles={{}}
    />
  );
}
