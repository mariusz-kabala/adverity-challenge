import React, { FC } from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis } from "recharts";
import { useChart } from "hooks";

export const Chart: FC = () => {
  const { xAxis, yAxis, data, lines } = useChart();
  return (
    <div>
      <h1>Chart</h1>

      <LineChart width={600} height={600} data={data}>
        {xAxis.map((x) => (
          <XAxis
            key={`x-${x.dataKey}`}
            dataKey={x.dataKey}
            orientation={x.orientation as "bottom"}
          />
        ))}
        {yAxis.map((y) => (
          <YAxis
            key={`y-${y.dataKey}`}
            dataKey={y.dataKey}
            orientation={y.orientation as "left"}
          />
        ))}
        {lines.map((line) => (
          <Line
            key={`line-${line.dataKey}`}
            type={line.type as "monotone"}
            dataKey={line.dataKey}
            stroke={line.stroke}
          />
        ))}
      </LineChart>
    </div>
  );
};
