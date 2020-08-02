import { getRandomColor } from "./color";

describe("color helper", () => {
  it("Should return a random color", () => {
    const expected = /^#[0-9A-F]{6}$/i;

    expect(getRandomColor()).toEqual(expect.stringMatching(expected));
    expect(getRandomColor()).toEqual(expect.stringMatching(expected));
    expect(getRandomColor()).toEqual(expect.stringMatching(expected));
    expect(getRandomColor()).toEqual(expect.stringMatching(expected));
    expect(getRandomColor()).toEqual(expect.stringMatching(expected));
  });
});
