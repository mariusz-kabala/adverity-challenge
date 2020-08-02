import { useContext, useCallback, useEffect, useRef } from "react";
import {
  SetupContext,
  SetupChangerContext,
  ISetupContext,
  DataContext,
} from "context";
import { ICsvField } from "types/csvField";
import { createWorker, WorkerType } from "workers/createWorker";
import * as timeRange from "workers/timeRange.worker";

const getAvailableOptions = (
  setup: ISetupContext,
  fields: ICsvField[],
  source: "time" | "dimensions" | "metrics"
) => {
  return setup.allOptions.filter((option) => {
    if (fields.some((f) => f.label === option.label)) {
      return false;
    }

    if (source !== "time" && setup.time && option.label === setup.time.label) {
      return false;
    }

    if (
      source !== "dimensions" &&
      setup.dimensions.some((d) => d.label === option.label)
    ) {
      return false;
    }

    if (
      source !== "metrics" &&
      setup.metrics.some((m) => m.label === option.label)
    ) {
      return false;
    }

    return true;
  });
};

export const useSetup = () => {
  const setup = useContext(SetupContext);
  const changer = useContext(SetupChangerContext);
  const data = useContext(DataContext);

  const timeRangeInstance = useRef<WorkerType<typeof timeRange>>(
    createWorker(timeRange)
  );

  useEffect(() => {
    if (!setup.dateFormat || setup.time === null || data.data.length === 0) {
      return;
    }

    (async () => {
      const [minDate, maxDate] = await timeRangeInstance.current.findTimeRange(
        data.data,
        setup.time?.label as string,
        setup.dateFormat as string
      );

      changer((value: ISetupContext) => ({
        ...value,
        timeRange: [new Date(minDate), new Date(maxDate)],
      }));
    })();
  }, [setup.dateFormat, setup.time, data.data, changer]);

  const updateTime = useCallback(
    (time: ICsvField) => {
      changer({
        ...setup,
        time,
        availableOptions: getAvailableOptions(setup, [time], "time"),
      });
    },
    [setup, changer]
  );

  const updateDimensions = useCallback(
    (dimensions: ICsvField[]) => {
      changer({
        ...setup,
        dimensions,
        availableOptions: getAvailableOptions(setup, dimensions, "dimensions"),
      });
    },
    [setup, changer]
  );

  const updateMetrics = useCallback(
    (metrics: ICsvField[]) => {
      const toApply = metrics.slice(0, 2);
      changer({
        ...setup,
        metrics: toApply,
        availableOptions: getAvailableOptions(setup, toApply, "metrics"),
      });
    },
    [setup, changer]
  );

  const updateOptions = useCallback(
    (values: ICsvField[]) => {
      changer((value) => ({
        ...value,
        time: null,
        dimensions: [],
        metrics: [],
        allOptions: [...values],
        availableOptions: [...values],
      }));
    },
    [changer]
  );

  const loadDefaultSetup = useCallback(() => {
    changer((setup) => ({
      ...setup,
      metrics: [
        {
          label: "Clicks",
          index: 1,
        },
        {
          label: "Impressions",
          index: 2,
        },
      ],
      time: {
        label: "Date",
        index: 0,
      },
      dimensions: [
        {
          label: "Campaign",
          index: 3,
        },
        {
          label: "Datasource",
          index: 4,
        },
      ],
      availableOptions: [],
    }));
  }, [changer]);

  return {
    updateTime,
    updateDimensions,
    updateMetrics,
    updateOptions,
    loadDefaultSetup,
    setup,
  };
};
