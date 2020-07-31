export const getUniqueValues = (
  data: string[][]
): { [field: string]: string[] } => {
  if (data.length === 0) {
    return {};
  }

  const { fields, mapper } = (data.shift() as string[]).reduce(
    (
      all: {
        fields: { [field: string]: string[] };
        mapper: { [index: number]: string };
      },
      field: string,
      index: number
    ) => {
      all.fields[field] = [];
      all.mapper[index] = field;

      return all;
    },
    { fields: {}, mapper: {} }
  );

  for (const row of data) {
    for (const index in row) {
      const field = mapper[index];

      if (field && !fields[field].includes(row[index])) {
        fields[field].push(row[index]);
      }
    }
  }

  return fields;
};
