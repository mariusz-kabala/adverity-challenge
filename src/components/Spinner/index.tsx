import React, { FC } from "react";
import styles from './styles.module.scss';

export const Spinner: FC = () => (
  <div className={styles.spinner} data-testid="spinner">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
);
