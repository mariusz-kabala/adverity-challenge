import React, { FC, useCallback, useState, useRef } from "react";
import { useCsv } from "hooks";
import { readFileByChunk } from "helpers";
import { Spinner } from "components/Spinner";
import { Button } from "components/Button";
import styles from "./styles.module.scss";

enum UploaderStages {
  selectFile,
  errorOccurred,
  ready,
}

export const CSVUploader: FC<{}> = () => {
  const { parse, finish, terminate, isLoading } = useCsv();
  const [stage, setStage] = useState<UploaderStages>(UploaderStages.selectFile);
  const fileRef = useRef<HTMLInputElement>(null)
  const onSelectFileToRead = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files && e.target.files[0];

      if (!file) {
        return;
      }

      readFileByChunk({
        file,
        onChunk: parse,
        onError: () => {
          setStage(UploaderStages.errorOccurred);
          terminate();
        },
        onEnd: () => {
          setStage(UploaderStages.ready);
          finish();
        },
      });
    },
    [parse, finish, terminate]
  );
  const onButtonClick = useCallback(() => {
    if (!fileRef.current) {
      return
    }

    fileRef.current.click()
  }, [fileRef])

  return (
    <div className={styles.wrapper}>
      {isLoading && (
        <div className={styles.spinner}>
          <Spinner />
        </div>
      )}
      {!isLoading && stage === UploaderStages.selectFile && (
        <div>
          <Button label="Upload a file" onClick={onButtonClick} />
          <input type="file" ref={fileRef} onChange={onSelectFileToRead} />
        </div>
      )}
      {!isLoading && stage === UploaderStages.errorOccurred && (
        <p>Error occured</p>
      )}
      {!isLoading && stage === UploaderStages.ready && (
        <p>File has been loaded. Load another file</p>
      )}
    </div>
  );
};
