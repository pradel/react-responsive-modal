export default {
  overlay: {
    background: 'rgba(0, 0, 0, 0.75)',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflowY: 'auto',
    overflowX: 'hidden',
    zIndex: 1000,
    padding: '1.2rem',
  },
  overlayLittle: {
    alignItems: 'center',
  },
  modal: {
    maxWidth: 800,
    position: 'relative',
    padding: '1.2rem',
    background: '#ffffff',
    backgroundClip: 'padding-box',
    boxShadow: '0 12px 15px 0 rgba(0,0,0,0.25)',
  },
  closeIcon: {
    position: 'absolute',
    top: '14px',
    right: '14px',
    cursor: 'pointer',
  },
  transitionEnter: {
    opacity: '0.01',
  },
  transitionEnterActive: {
    opacity: 1,
    transition: 'opacity 500ms cubic-bezier(0.23, 1, 0.32, 1)',
  },
  transitionExit: {
    opacity: 1,
  },
  transitionExitActive: {
    opacity: '0.01',
    transition: 'opacity 500ms cubic-bezier(0.23, 1, 0.32, 1)',
  },
};
