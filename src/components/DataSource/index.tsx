import React, { FC } from "react";
import { CSVUploader } from "components/CSVUploader";
import { CSVFetcher } from "components/CSVFetcher";
import styles from "./styles.module.scss";

export const DataSource: FC = () => {
  return (
    <div  className={styles.wrapper}>
        <p>You can upload any CVS file or download and use our example</p>
      <div className={styles.content}>
        <CSVUploader />
        <CSVFetcher />
      </div>
    </div>
  );
};
