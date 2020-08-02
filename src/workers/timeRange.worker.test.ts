import { findTimeRange } from "./timeRange.worker";
import { data } from "./test/data";

describe("TimeRange", () => {
  it("Should find min and max date", () => {
    expect(findTimeRange(data, "Date", "dd.MM.yyyy")).toEqual([
      1546297200000,
      1546470000000,
    ]);
  });
});
