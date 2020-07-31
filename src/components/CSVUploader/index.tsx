import React, { FC, useCallback, useState } from "react";
import { useCsv } from "hooks";
import { readFileByChunk } from "helpers";

enum UploaderStages {
  selectFile,
  readingFile,
  errorOccurred,
  ready,
}

export const CSVUploader: FC<{}> = () => {
  const { parse, finish, terminate } = useCsv();
  const [stage, setStage] = useState<UploaderStages>(UploaderStages.selectFile);
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

  return (
    <div>
      CSVUploader
      {stage === UploaderStages.selectFile && (
        <input type="file" onChange={onSelectFileToRead} />
      )}
      {stage === UploaderStages.errorOccurred && <p>Error occured</p>}
    </div>
  );
};
