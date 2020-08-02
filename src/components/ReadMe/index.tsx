import React, { FC, useState } from "react";
import raw from "raw.macro";
import ReactMarkdown from "react-markdown";
import { Button } from "components/Button";
import styles from "./styles.module.scss";

const markdown = raw("../../../README.md");

export const ReadMe: FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  if (!isVisible) {
    return null;
  }
  return (
    <div className={styles.wrapper}>
      <ReactMarkdown source={markdown} />
      <div className={styles.confirmation}>
        <Button
          label="OK, I understand; Let me use it now"
          onClick={() => setIsVisible(false)}
        />
      </div>
    </div>
  );
};
