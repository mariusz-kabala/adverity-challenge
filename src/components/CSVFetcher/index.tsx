import React, { FC, useState, useCallback } from "react";
import { Button } from "components/Button";
import { Spinner } from "components/Spinner";
import { useCsv } from "hooks";
import { readFileByChunk } from "helpers";
import styles from "./styles.module.scss";

const DATA_URL = `${process.env.PUBLIC_URL}/DAMKBAoDBwoDBAkOBAYFCw.csv`;

export const CSVFetcher: FC = () => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const { parse, finish, terminate, isLoading } = useCsv();

  const fetchData = useCallback(() => {
    setIsFetching(true);

    fetch(DATA_URL)
      .then((res) => {
        return res.blob();
      })
      .then((file) => {
        setIsFetching(false);

        readFileByChunk({
          file,
          onChunk: parse,
          onError: () => {
            terminate();
          },
          onEnd: () => {
            finish();
          },
        });
      });
  }, [finish, parse, terminate]);
  return (
    <div className={styles.wrapper}>
      {!(isFetching || isLoading) && (
        <Button label="Fetch example data" onClick={fetchData} />
      )}
      {(isFetching || isLoading) && (
        <div className={styles.spinner}>
          <Spinner />
        </div>
      )}
    </div>
  );
};
