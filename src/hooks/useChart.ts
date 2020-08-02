import { useContext, useState, useEffect, useRef } from "react";
import {
  IDataContext,
  DataContext,
  FiltersContext,
  SetupContext,
} from "context";
import { createWorker, WorkerType } from "workers/createWorker";
import * as aggregator from "workers/dataAggregator.worker";
import { getRandomColor } from "helpers";

const yAxisOrientation = ["left", "right"];
const colors = new Array(10).fill(null).map(getRandomColor);

export interface IChartState {
  isReady: boolean;
  isLoading: boolean;
  data: {
    [field: string]: string | number;
  }[];
}

export interface IUseChart extends IChartState {
  xAxis: {
    orientation: "bottom" | "top";
    dataKey: string;
  }[];
  yAxis: {
    orientation: "left" | "right";
    dataKey: string;
  }[];
  lines: {
    stroke: string;
    dataKey: string;
    type: "monotone";
  }[];
}

export const useChart = (): IUseChart => {
  const { data } = useContext<IDataContext>(DataContext);
  const filters = useContext(FiltersContext);
  const setup = useContext(SetupContext);
  const metrics = setup.metrics.slice(0, 2);
  const [state, setState] = useState<IChartState>({
    isReady: false,
    isLoading: false,
    data: [],
  });
  const aggregatorInstance = useRef<WorkerType<typeof aggregator>>(
    createWorker(aggregator)
  );

  useEffect(() => {
    if (
      !setup.time ||
      !setup.dateFormat ||
      setup.dimensions.length === 0 ||
      setup.metrics.length === 0 ||
      filters.timeRange.filter((time) => time !== null).length !== 2
    ) {
      return setState({
        isLoading: false,
        isReady: false,
        data: [],
      });
    }

    setState({
      isLoading: true,
      isReady: true,
      data: [],
    });

    (async () => {
      const result = await aggregatorInstance.current.aggregate({
        timeField: setup.time?.label || "",
        dimensions: setup.dimensions.map((field) => field.label),
        metrics: setup.metrics.map((field) => field.label),
        dateFormat: setup.dateFormat || "",
        timeRange: filters.timeRange,
        appliedFilters: filters.applied,
        data,
      });

      setState({
        isLoading: false,
        isReady: true,
        data: result,
      });
    })();
  }, [setup, data, filters]);

  return {
    xAxis: [
      {
        orientation: "bottom",
        dataKey: setup.time?.label || '',
      },
    ],
    yAxis: metrics.map((field, index) => ({
      orientation: yAxisOrientation[index] as "left" | "right",
      dataKey: field.label,
    })),
    lines: metrics.map((metric, index) => ({
      stroke: colors[index] ?? getRandomColor(),
      dataKey: metric.label,
      type: "monotone",
    })),
    ...state,
  };
};
