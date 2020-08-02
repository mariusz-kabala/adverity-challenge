import { parse, format } from "date-fns";

export const aggregate = ({
  timeField,
  dimensions,
  metrics,
  timeRange,
  dateFormat,
  appliedFilters,
  data,
}: {
  timeField: string;
  dimensions: string[];
  metrics: string[];
  timeRange: Date[];
  dateFormat: string;
  appliedFilters: {
    [field: string]: string[];
  };
  data: { [field: string]: string }[];
}) => {
  const [minDate, maxDate] = timeRange;
  const results: {
    [date: number]: {
      [field: string]: number;
    };
  } = {};
  const now = new Date();

  dataLoop: for (const row of data) {
    const date = parse(row[timeField], dateFormat, now);

    if (date > maxDate || date < minDate) {
      continue;
    }

    for (const dimension of dimensions) {
      if (
        appliedFilters[dimension] &&
        appliedFilters[dimension].length > 0 &&
        !appliedFilters[dimension].includes(row[dimension])
      ) {
        continue dataLoop;
      }
    }

    if (typeof results[date.getTime()] === "undefined") {
      results[date.getTime()] = {};
    }

    for (const metric of metrics) {
      const value = parseInt(row[metric], 10) || 0;

      if (typeof results[date.getTime()][metric] === "undefined") {
        results[date.getTime()][metric] = value;
      } else {
        results[date.getTime()][metric] += value;
      }
    }
  }

  return Object.keys(results)
    .reduce(
      (
        all: { time: number; data: { [field: string]: number } }[],
        time: string
      ) => {
        const parsedTime = parseInt(time, 10);
        all.push({
          time: parsedTime,
          data: results[parsedTime],
        });

        return all;
      },
      []
    )
    .sort((recordA, recordB) => {
      return recordA.time - recordB.time;
    })
    .map((record) => ({
      [timeField]: format(record.time, dateFormat),
      ...record.data,
    }));
};
