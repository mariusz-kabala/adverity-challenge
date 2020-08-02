import { formatData } from "./dataFormatter.worker";

describe("DataFormatter", () => {
  it("Should format data", () => {
    const [result, header] = formatData([
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
    ]);

    expect(result).toEqual([
      {
        Date: "01.01.2019",
        Datasource: "Facebook Ads",
        Campaign: "Like Ads",
        Clicks: "274",
        Impressions: "1979",
      },
      {
        Date: "01.01.2019",
        Datasource: "Facebook Ads",
        Campaign: "Offer Campaigns - Conversions",
        Clicks: "10245",
        Impressions: "764627",
      },
      {
        Date: "01.01.2019",
        Datasource: "Google Adwords",
        Campaign: "B2B - Leads",
        Clicks: "7",
        Impressions: "444",
      },
      {
        Date: "01.01.2019",
        Datasource: "Google Adwords",
        Campaign: "GDN Prospecting - App - Prio 1 Offer",
        Clicks: "16",
        Impressions: "12535",
      },
      {
        Date: "01.01.2019",
        Datasource: "Google Adwords",
        Campaign: "GDN Prospecting - App - Prio 2 Offer",
        Clicks: "93",
        Impressions: "18866",
      },
    ]);

    expect(header).toEqual([
      "Date",
      "Datasource",
      "Campaign",
      "Clicks",
      "Impressions",
    ]);
  });
});
