import React from 'react';
import cx from 'classnames';

interface CloseIconProps {
  id?: string;
  closeIcon?: React.ReactNode;
  styles?: {
    closeButton?: React.CSSProperties;
    closeIcon?: React.CSSProperties;
  };
  classNames?: {
    closeButton?: string;
    closeIcon?: string;
  };
  classes: {
    closeButton?: string;
  };
  onClick: () => void;
}

const CloseIcon = ({
  classes,
  classNames,
  styles,
  id,
  closeIcon,
  onClick,
}: CloseIconProps) => (
  <button
    id={id}
    className={cx(classes.closeButton, classNames?.closeButton)}
    style={styles?.closeButton}
    onClick={onClick}
    data-testid="close-button"
  >
    {closeIcon ? (
      closeIcon
    ) : (
      <svg
        className={classNames?.closeIcon}
        style={styles?.closeIcon}
        width={28}
        height={28}
        viewBox="0 0 36 36"
        data-testid="close-icon"
      >
        <path d="M28.5 9.62L26.38 7.5 18 15.88 9.62 7.5 7.5 9.62 15.88 18 7.5 26.38l2.12 2.12L18 20.12l8.38 8.38 2.12-2.12L20.12 18z" />
      </svg>
    )}
  </button>
);

export default CloseIcon;
