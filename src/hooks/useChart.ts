import { useContext } from "react";
import {
  IDataContext,
  DataContext,
  FiltersContext,
  SetupContext,
} from "context";

const yAxisOrientation = ["left", "right"];

export const useChart = () => {
  const { data } = useContext<IDataContext>(DataContext);
  const filters = useContext(FiltersContext);
  const setup = useContext(SetupContext);
  const metrics = setup.metrics.slice(0, 2);

  return {
    xAxis: [
      {
        orientation: "bottom",
        dataKey: setup.time?.label,
      },
    ],
    yAxis: metrics.map((field, index) => ({
      orientation: yAxisOrientation[index],
      dataKey: field.label,
    })),
    data,
    lines: metrics.map(metric => ({
        stroke: `#${Math.floor(Math.random()*16777215).toString(16)}`,
        dataKey: metric.label,
        type: "monotone",
    }))
  };
};
