import { getUniqueValues } from "./uniqueValues.worker";

describe("UniqueValues", () => {
  it("Should return unique values", () => {
    expect(
      getUniqueValues([
        ["Date", "Datasource", "Campaign", "Clicks", "Impressions"],
        ["01.01.2019", "Facebook Ads", "Like Ads", "274", "1979"],
        [
          "01.01.2019",
          "Facebook Ads",
          "Offer Campaigns - Conversions",
          "10245",
          "764627",
        ],
        ["01.01.2019", "Google Adwords", "B2B - Leads", "7", "444"],
        [
          "01.01.2019",
          "Google Adwords",
          "GDN Prospecting - App - Prio 1 Offer",
          "16",
          "12535",
        ],
        [
          "01.01.2019",
          "Google Adwords",
          "GDN Prospecting - App - Prio 2 Offer",
          "93",
          "18866",
        ],
      ])
    ).toEqual({
      Date: ["01.01.2019"],
      Datasource: ["Facebook Ads", "Google Adwords"],
      Campaign: [
        "Like Ads",
        "Offer Campaigns - Conversions",
        "B2B - Leads",
        "GDN Prospecting - App - Prio 1 Offer",
        "GDN Prospecting - App - Prio 2 Offer",
      ],
      Clicks: ["274", "10245", "7", "16", "93"],
      Impressions: ["1979", "764627", "444", "12535", "18866"],
    });
  });

  it("Should return empty object if no data", () => {
    expect(getUniqueValues([])).toEqual({});
  });
});
