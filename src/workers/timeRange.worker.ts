import { parse } from "date-fns";

export const findTimeRange = (
  data: { [field: string]: string }[],
  dateField: string,
  dateFormat: string
) => {
  const now = new Date();
  let minDate = now.getTime();
  let maxDate = -1;

  for (const row of data) {
    const date = parse(row[dateField], dateFormat, now);

    if (date.getTime() > maxDate) {
      
      maxDate = date.getTime();
    }

    if (date.getTime() < minDate) {
      minDate = date.getTime();
    }
  }

  return [minDate, maxDate];
};
