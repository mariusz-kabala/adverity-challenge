import React, { FC, useCallback, useMemo } from "react";
import cx from "classnames";
import { MultiSelectDropdown } from "components/MultiSelectDropdown";
import { Dropdown } from "components/Dropdown";
import { Button } from "components/Button";
import { useSetup } from "hooks";
import styles from "./styles.module.scss";

export const Setup: FC<{ goNext: () => void }> = ({ goNext }) => {
  const {
    updateTime,
    updateDimensions,
    updateMetrics,
    loadDefaultSetup,
    setup,
  } = useSetup();

  const options = useMemo(
    () => setup.availableOptions.map((field) => field.label),
    [setup]
  );
  const onDimensionAdd = useCallback(
    (value: string) => {
      const field = setup.allOptions.find((o) => o.label === value);

      if (field) {
        updateDimensions([...setup.dimensions, field]);
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
        updateMetrics([field, ...setup.metrics]);
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

  const isReady = useMemo(() => {
    return (
      setup.time &&
      setup.timeRange.length === 2 &&
      setup.dimensions.length > 0 &&
      setup.metrics.length > 0
    );
  }, [setup]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.item}>
        <h3>Time:</h3>
        <Dropdown
          options={options}
          selected={setup.time?.label}
          onSelect={onSelectTime}
        />
      </div>

      <div className={styles.item}>
        <h3>Dimensions:</h3>
        <MultiSelectDropdown
          onAdd={onDimensionAdd}
          onRemove={onDimensionRemove}
          options={options}
          selected={setup.dimensions.map((field) => field.label)}
        />
      </div>

      <div className={styles.item}>
        <h3>Metrics:</h3>
        <MultiSelectDropdown
          onAdd={onMetricAdd}
          onRemove={onMetricRemove}
          options={options}
          selected={setup.metrics.map((field) => field.label)}
        />
      </div>

      <div className={cx(styles.item, styles.next)}>
        <Button label={"Load default config"} onClick={loadDefaultSetup} />
        {isReady && <Button label={"GO next"} onClick={goNext} />}
      </div>
    </div>
  );
};
