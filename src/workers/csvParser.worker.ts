let cache = "";

export const csvParser = (csv: string) => {
  const lines = (cache + csv).split("\n");
  const result: string[][] = [];

  if (lines[lines.length - 1] !== "") {
    cache = lines.pop() as string;
  }

  for (const line of lines) {
    if (line === "") {
      continue;
    }
    result.push(line.split(","));
  }

  return result
};
