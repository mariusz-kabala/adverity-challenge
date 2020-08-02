import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { DropdownOptions } from "./index";

describe("<DropdownOptions /> Component", () => {
  it("Should render list of options", () => {
    const { getByTestId, queryByText } = render(
      <DropdownOptions options={["lorem", "ipsum"]} onAdd={jest.fn()} />
    );

    expect(getByTestId("dropdown-options")).toBeInTheDocument();
    expect(queryByText("lorem")).toBeInTheDocument();
    expect(queryByText("ipsum")).toBeInTheDocument();
  });

  it("Should trigger onAdd callback", () => {
    const onAdd = jest.fn();
    render(<DropdownOptions options={["lorem", "ipsum"]} onAdd={onAdd} />);

    fireEvent.click(screen.getByText("lorem"));

    expect(onAdd).toBeCalledTimes(1);
    expect(onAdd).toBeCalledWith("lorem");
  });
});
