import * as csvParser from "workers/csvParser.worker";
import * as uniqueValues from "workers/uniqueValues.worker";
import * as dataFormatter from "workers/dataFormatter.worker";
import { createWorker, WorkerType } from "workers/createWorker";
import { DataChangerContext, IDataChangerContext } from "context";
import { useRef, useContext, useState } from "react";

class ChunkStatus {
  public chunks: boolean[];

  constructor() {
    this.chunks = [];
  }

  public registerChunk() {
    return this.chunks.push(false) - 1;
  }

  public markAsReady(index: number) {
    this.chunks[index] = true;
  }

  public isReady() {
    return !this.chunks.some((value) => value === false);
  }
}

export const useCsv = () => {
  const csvParserInstance = useRef<WorkerType<typeof csvParser>>(
    createWorker(csvParser)
  );
  const uniqueValuesInstance = useRef<WorkerType<typeof uniqueValues>>(
    createWorker(uniqueValues)
  );
  const dataFormatterInstance = useRef<WorkerType<typeof dataFormatter>>(
    createWorker(dataFormatter)
  );
  const data = useRef<string[][]>([]);
  const status = useRef(new ChunkStatus());
  const changer = useContext<IDataChangerContext>(DataChangerContext);
  const finishInterval = useRef<NodeJS.Timeout>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return {
    isLoading,
    parse: async (csv: string) => {
      setIsLoading(true)

      const index = status.current.registerChunk();
      const parsed = await csvParserInstance.current.csvParser(csv);
      data.current = [...data.current, ...parsed];

      status.current.markAsReady(index);
    },
    finish: () => {
      const onReady = async () => {
        const [unique, [formattedData, options]] = await Promise.all([
          uniqueValuesInstance.current.getUniqueValues(data.current),
          dataFormatterInstance.current.formatData(data.current),
        ]);

        changer({
          data: formattedData,
          options,
          unique,
        });
      };

      if (status.current.isReady()) {
        setIsLoading(false)
        return onReady();
      }

      finishInterval.current = setInterval(() => {
        if (!status.current.isReady()) {
          return;
        }

        if (finishInterval.current !== undefined) {
          clearInterval(finishInterval.current);
        }

        setIsLoading(false)
        onReady();
      }, 100);
    },
    terminate: csvParserInstance.current.terminate,
  };
};
