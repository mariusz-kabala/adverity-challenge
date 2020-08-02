import { csvParser } from "./csvParser.worker";

describe("CsvParser", () => {
  it("Should parse text", () => {
    const csv = `Date,Datasource,Campaign,Clicks,Impressions
01.01.2019,Facebook Ads,Like Ads,274,1979
01.01.2019,Facebook Ads,Offer Campaigns - Conversions,10245,764627
01.01.2019,Google Adwords,B2B - Leads,7,444
01.01.2019,Google Adwords,GDN Prospecting - App - Prio 1 Offer,16,12535
01.01.2019,Google Adwords,GDN Prospecting - App - Prio 2 Offer,93,18866
`;
    expect(csvParser(csv)).toEqual([
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
  });

  it("Should parse incomplete csv chunk", () => {
    const csv = `Date,Datasource,Campaign,Clicks,Impressions
01.01.2019,Facebook Ads,Like Ads,274,1979
01.01.2019,Facebook A`;
    const csv2 = `ds,Offer Campaigns - Conversions,10245,764627
01.01.2019,Google Adwords,B2B - Leads,7,444
01.01.2019,Google Adwords,GDN Prospecting - App - Prio 1 Offer,16,12535
01.01.2019,Google Adwords,GDN Prospecting - App - Prio 2 Offer,93,18866
`;

    expect(csvParser(csv)).toEqual([
      ["Date", "Datasource", "Campaign", "Clicks", "Impressions"],
      ["01.01.2019", "Facebook Ads", "Like Ads", "274", "1979"],
    ]);
    expect(csvParser(csv2)).toEqual([
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
  });
});
