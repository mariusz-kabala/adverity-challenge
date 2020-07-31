import * as csvParser from "workers/csvParser.worker";
import * as uniqueValues from "workers/uniqueValues.worker";
import * as dataFormatter from "workers/dataFormatter.worker";
import { createWorker, WorkerType } from "workers/createWorker";
import { DataChangerContext, IDataChangerContext } from "context";
import { useRef, useContext } from "react";

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
  const changer = useContext<IDataChangerContext>(DataChangerContext);

  return {
    parse: async (csv: string) => {
      const parsed = await csvParserInstance.current.csvParser(csv);
      data.current = [...data.current, ...parsed];
    },
    finish: async () => {
      const [unique, [formattedData, options] ] = await Promise.all([
        uniqueValuesInstance.current.getUniqueValues(
          data.current
        ),
        dataFormatterInstance.current.formatData(data.current)
      ])

      changer({
        data: formattedData,
        options,
        unique,
      });
    },
    terminate: csvParserInstance.current.terminate,
  };
};
