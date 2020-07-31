import React, { FC, useCallback, useMemo } from "react";
import { MultiSelectDropdown } from "components/MultiSelectDropdown";
import { Dropdown } from "components/Dropdown";
import { Button } from "components/Button";
import { useSetup } from "hooks";

export const Setup: FC = () => {
  const { updateTime, updateDimensions, updateMetrics, setup } = useSetup();
  const options = useMemo(
    () => setup.availableOptions.map((field) => field.label),
    [setup]
  );
  const onDimensionAdd = useCallback(
    (value: string) => {
      const field = setup.allOptions.find((o) => o.label === value);

      if (field) {
        updateDimensions([field, ...setup.dimensions]);
      }
    },
    [setup, updateDimensions]
  );
  const onDimensionRemove = useCallback(
    (value: string) => {
      const dimensions = [...setup.dimensions];
      const index = dimensions.findIndex((d) => d.label === value);

      if (index > -1) {
        dimensions.splice(index, 1);
        updateDimensions(dimensions);
      }
    },
    [setup, updateDimensions]
  );
  const onMetricAdd = useCallback(
    (value: string) => {
      const field = setup.allOptions.find((o) => o.label === value);

      if (field) {
        updateMetrics([...setup.metrics, field]);
      }
    },
    [setup, updateMetrics]
  );
  const onMetricRemove = useCallback(
    (value: string) => {
      const metrics = [...setup.metrics];
      const index = metrics.findIndex((d) => d.label === value);

      if (index > -1) {
        metrics.splice(index, 1);
        updateMetrics(metrics);
      }
    },
    [setup, updateMetrics]
  );

  const onSelectTime = useCallback(
    (value: string) => {
      const field = setup.allOptions.find((o) => o.label === value);

      if (field) {
        updateTime(field);
      }
    },
    [setup, updateTime]
  );

  const canApply = useMemo(
    () => setup.time && setup.dimensions.length > 0 && setup.metrics.length > 0,
    [setup]
  );

  return (
    <div>
      <div>
        <h3>Time</h3>
        <Dropdown
          options={options}
          selected={setup.time?.label}
          onSelect={onSelectTime}
        />
      </div>

      <div>
        <h3>Dimensions</h3>
        <MultiSelectDropdown
          onAdd={onDimensionAdd}
          onRemove={onDimensionRemove}
          options={options}
          selected={setup.dimensions.map((field) => field.label)}
        />
      </div>

      <div>
        <h3>Metrics</h3>
        <MultiSelectDropdown
          onAdd={onMetricAdd}
          onRemove={onMetricRemove}
          options={options}
          selected={setup.metrics.map((field) => field.label)}
        />
      </div>

      {canApply && <Button label={"Apply setup"} onClick={() => null} />}
    </div>
  );
};
