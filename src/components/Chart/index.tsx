import React, { FC } from "react";
import {
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
} from "recharts";
import { useChart } from "hooks";
import { formatter } from "helpers"
import { Spinner } from "components/Spinner";
import styles from "./styles.module.scss";

export const Chart: FC = () => {
  const { xAxis, yAxis, data, lines, isReady, isLoading } = useChart();

  if (!isReady || isLoading) {
    return (
      <div className={styles.wrapper}>
        {!isLoading && (
          <p>
            Chart will appear as soon as you setup data and filters on the left
            panel
          </p>
        )}
        {isLoading && (
          <div className={styles.spinner}>
            <Spinner />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      {data.length > 0 && (
        <ResponsiveContainer>
          <LineChart width={600} height={600} data={data}>
            {xAxis.map((x) => (
              <XAxis
                key={`x-${x.dataKey}`}
                dataKey={x.dataKey}
                orientation={x.orientation}
              />
            ))}
            {yAxis.map((y) => (
              <YAxis
                key={`y-${y.dataKey}`}
                dataKey={y.dataKey}
                yAxisId={y.dataKey}
                tickFormatter={formatter}
                orientation={y.orientation}
              />
            ))}
            {lines.map((line) => (
              <Line
                key={`line-${line.dataKey}`}
                yAxisId={line.dataKey}
                type={line.type}
                dataKey={line.dataKey}
                stroke={line.stroke}
              />
            ))}
            <Legend />
          </LineChart>
        </ResponsiveContainer>
      )}
      {data.length === 0 && (
        <p>No data for selected time frame and dimentions</p>
      )}
    </div>
  );
};
