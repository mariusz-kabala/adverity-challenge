import { aggregate } from "./dataAggregator.worker";
import { data } from "./test/data";

describe("DataAggregator", () => {
  it("Should aggregate all data", () => {
    expect(
      aggregate({
        timeField: "Date",
        dimensions: ["Datasource", "Campaign"],
        metrics: ["Clicks", "Impressions"],
        dateFormat: "dd.MM.yyyy",
        timeRange: [new Date("01.01.2019"), new Date("01.03.2019")],
        appliedFilters: {},
        data,
      })
    ).toEqual([
      { Date: "01.01.2019", Clicks: 10635, Impressions: 798451 },
      { Date: "02.01.2019", Clicks: 317, Impressions: 132340 },
      { Date: "03.01.2019", Clicks: 106, Impressions: 35333 },
    ]);
  });

  it("Should aggregate in defiend time frame", () => {
    expect(
      aggregate({
        timeField: "Date",
        dimensions: ["Datasource", "Campaign"],
        metrics: ["Clicks", "Impressions"],
        dateFormat: "dd.MM.yyyy",
        timeRange: [new Date("01.02.2019"), new Date("01.03.2019")],
        appliedFilters: {},
        data,
      })
    ).toEqual([
      { Date: "02.01.2019", Clicks: 317, Impressions: 132340 },
      { Date: "03.01.2019", Clicks: 106, Impressions: 35333 },
    ]);
  });

  it("Should aggregate and apply filters on data", () => {
    expect(
      aggregate({
        timeField: "Date",
        dimensions: ["Datasource", "Campaign"],
        metrics: ["Clicks", "Impressions"],
        dateFormat: "dd.MM.yyyy",
        timeRange: [new Date("01.01.2019"), new Date("01.03.2019")],
        appliedFilters: {
          Datasource: ["Google Adwords"],
        },
        data,
      })
    ).toEqual([
        { Date: '01.01.2019', Clicks: 116, Impressions: 31845 },
        { Date: '02.01.2019', Clicks: 118, Impressions: 2748 },
        { Date: '03.01.2019', Clicks: 51, Impressions: 3186 }
    ]);
  });

  it("Should aggregate in defiend time frame and apply filters on data", () => {
      expect(
        aggregate({
            timeField: "Date",
            dimensions: ["Datasource", "Campaign"],
            metrics: ["Clicks", "Impressions"],
            dateFormat: "dd.MM.yyyy",
            timeRange: [new Date("01.01.2019"), new Date("01.02.2019")],
            appliedFilters: {
              Datasource: ["Google Adwords"],
            },
            data,
          })
      ).toEqual([
        { Date: '01.01.2019', Clicks: 116, Impressions: 31845 },
        { Date: '02.01.2019', Clicks: 118, Impressions: 2748 },
    ]);
  })
});
