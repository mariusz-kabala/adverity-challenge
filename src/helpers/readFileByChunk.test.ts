import { readFileByChunk } from "./readFileByChunk";

describe("readFileByChunk helper", () => {
  it("Should ", (done) => {
    const fakeBlob = new Blob(
      [
        `Date,Datasource,Campaign,Clicks,Impressions
01.01.2019,Facebook Ads,Like Ads,274,1979
01.01.2019,Facebook Ads,Offer Campaigns - Conversions,10245,764627
01.01.2019,Google Adwords,B2B - Leads,7,444
01.01.2019,Google Adwords,GDN Prospecting - App - Prio 1 Offer,16,12535
01.01.2019,Google Adwords,GDN Prospecting - App - Prio 2 Offer,93,18866
`,
      ],
      { type: "text/csv" }
    );
    const onChunk = jest.fn();
    const onError = jest.fn();
    const onEnd = jest.fn();

    readFileByChunk({
        file: fakeBlob,
        onChunk,
        onError,
        onEnd,
        chunkSize: 64
    });

    setTimeout(() => {
        expect(onChunk).toBeCalledTimes(6)
        expect(onEnd).toBeCalledTimes(1)
        expect(onError).not.toBeCalled();
        done()
    }, 250)
  });
});
