import React, { FC } from "react";
import styles from './styles.module.scss'

export const Button: FC<{ label: string; onClick: () => void }> = ({
  label,
  onClick,
}) => {
  return <button className={styles.wrapper} onClick={onClick}>{label}</button>;
};
