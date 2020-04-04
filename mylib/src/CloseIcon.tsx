import React from 'react';
import cx from 'classnames';

interface CloseIconProps {
  id: string;
  closeIconSize: number;
  closeIconSvgPath: React.ReactNode;
  onClickCloseIcon: () => void;
  classNames: any;
  styles: any;
  classes: any;
}

const CloseIcon = ({
  classes,
  classNames,
  styles,
  closeIconSize,
  closeIconSvgPath,
  onClickCloseIcon,
  id,
}: CloseIconProps) => (
  <button
    className={cx(classes.closeButton, classNames.closeButton)}
    style={styles.closeButton}
    onClick={onClickCloseIcon}
    id={id}
  >
    <svg
      className={cx(classes.closeIcon, classNames.closeIcon)}
      style={styles.closeIcon}
      xmlns="http://www.w3.org/2000/svg"
      width={closeIconSize}
      height={closeIconSize}
      viewBox="0 0 36 36"
    >
      {closeIconSvgPath}
    </svg>
  </button>
);

export default CloseIcon;
