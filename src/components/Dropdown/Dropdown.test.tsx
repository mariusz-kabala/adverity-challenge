import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Dropdown } from "./index";

describe("<Dropdown /> Component", () => {
  it("Should render a dropdown with a placeholder", () => {
    const { getByTestId, queryByText } = render(
      <Dropdown
        options={["lorem", "ipsum"]}
        placeholder={"example placeholder"}
        onSelect={jest.fn()}
      />
    );

    expect(getByTestId("dropdown")).toBeInTheDocument();
    expect(queryByText("example placeholder")).toBeInTheDocument();
  });

  it("Should render a dropdown with the selected value", () => {
    const { queryByText } = render(
      <Dropdown
        options={["lorem", "ipsum"]}
        selected={"ipsum"}
        onSelect={jest.fn()}
      />
    );

    expect(queryByText("ipsum")).toBeInTheDocument();
  });

  it ("Should open list of options", () => {
    const { getByTestId, queryByText, queryByTestId } = render(
        <Dropdown
          options={["lorem", "ipsum"]}
          placeholder={"example placeholder"}
          onSelect={jest.fn()}
        />
      );

      expect(queryByTestId('dropdown-options')).toBeNull();

      fireEvent.click(screen.getByText('example placeholder'))

      expect(getByTestId('dropdown-options')).toBeInTheDocument()
      expect(queryByText('lorem')).toBeInTheDocument()
      expect(queryByText('ipsum')).toBeInTheDocument()
  })

  it ("Should trigger onSelect callback", () => {
      const onSelect = jest.fn()
    const { queryByTestId } = render(
        <Dropdown
          options={["lorem", "ipsum"]}
          placeholder={"example placeholder"}
          onSelect={onSelect}
        />
      );

      fireEvent.click(screen.getByText('example placeholder'))
      fireEvent.click(screen.getByText('ipsum'))

      expect(onSelect).toBeCalledTimes(1)
      expect(onSelect).toBeCalledWith('ipsum')

      expect(queryByTestId('dropdown-options')).toBeNull();
  })
});
