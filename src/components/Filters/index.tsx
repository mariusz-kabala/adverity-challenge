import React, { FC } from "react";
import { useSetup, useData, useFilters } from "hooks";
import { MultiSelectDropdown } from "components/MultiSelectDropdown";

export const Filters: FC = () => {
  const { setup } = useSetup();
  const { getUnique } = useData();
  const {
    getAppliedFilters,
    getAddFilterValue,
    getRemoveFilterValue,
  } = useFilters();

  return (
    <div>
      {setup.dimensions.map((dimension) => (
        <div key={`dimension-${dimension.label}`}>
          <h3>{dimension.label}</h3>
          <MultiSelectDropdown
            options={getUnique(dimension.label)}
            selected={getAppliedFilters(dimension.label)}
            onAdd={getAddFilterValue(dimension.label)}
            onRemove={getRemoveFilterValue(dimension.label)}
          />
        </div>
      ))}
    </div>
  );
};
