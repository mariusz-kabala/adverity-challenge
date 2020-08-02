import React from "react";
import { render, fireEvent, act, waitFor } from "@testing-library/react";
import { CSVFetcher } from "./index";
import { useCsv } from "hooks";
import { readFileByChunk } from "helpers";

const fakeBlob = jest.fn();

jest.mock("hooks", () => ({
  useCsv: jest.fn().mockImplementation(() => ({
    parse: jest.fn(),
    finish: jest.fn(),
    terminate: jest.fn(),
    isLoading: false,
  })),
}));

jest.mock("helpers", () => ({
  readFileByChunk: jest.fn(),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    blob: () => Promise.resolve(fakeBlob),
  })
) as any;

describe("<CSVFetcher /> Component", () => {
  it("Should render the button", () => {
    (useCsv as jest.Mock).mockImplementationOnce(() => ({
      parse: jest.fn(),
      finish: jest.fn(),
      terminate: jest.fn(),
      isLoading: false,
    }));

    const { getByTestId } = render(<CSVFetcher />);

    expect(getByTestId("csv-fetcher")).toBeInTheDocument();
    expect(getByTestId("button")).toBeInTheDocument();

    expect(useCsv).toBeCalled();
  });

  it("Should render the spinner", () => {
    (useCsv as jest.Mock).mockImplementationOnce(() => ({
      parse: jest.fn(),
      finish: jest.fn(),
      terminate: jest.fn(),
      isLoading: true,
    }));

    const { getByTestId } = render(<CSVFetcher />);

    expect(getByTestId("csv-fetcher")).toBeInTheDocument();
    expect(getByTestId("spinner")).toBeInTheDocument();

    expect(useCsv).toBeCalled();
  });

  it("Should trigger file download", async () => {
    const parse = jest.fn();
    const finish = jest.fn();

    (useCsv as jest.Mock).mockImplementationOnce(() => ({
      parse,
      finish,
      terminate: jest.fn(),
      isLoading: false,
    }));

    const { getByTestId } = render(<CSVFetcher />);

    act(() => {
      fireEvent.click(getByTestId("button"));
    });

    await waitFor(() => {
      expect(readFileByChunk).toBeCalledTimes(1);

      const param = (readFileByChunk as jest.Mock).mock.calls[0][0];

      expect(param.file).toBe(fakeBlob);
      expect(param.onEnd).toBe(finish);
      expect(param.onChunk).toBe(parse);
    });
  });
});
