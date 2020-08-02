import React, { FC } from "react";
import cx from 'classnames'
import { useSetup, useData, useFilters } from "hooks";
import DatePicker from "react-datepicker";
import { MultiSelectDropdown } from "components/MultiSelectDropdown";

import "react-datepicker/dist/react-datepicker.css";
import styles from "./styles.module.scss";

export const Filters: FC = () => {
  const { setup } = useSetup();
  const { getUnique } = useData();
  const {
    getAppliedFilters,
    getAddFilterValue,
    getRemoveFilterValue,
    changeTimeRange,
    timeRange,
  } = useFilters();

  return (
    <div className={styles.wrapper}>
      {setup.timeRange.length === 2 && (
        <div className={cx(styles.datePicker, styles.item)}>
          <h3>Time range</h3>
          <DatePicker
            selected={timeRange[0]}
            maxDate={setup.timeRange[1]}
            minDate={setup.timeRange[0]}
            onChange={(dates) => {
              const [start, end] = (dates as any) as Date[]; // wrong typings

              changeTimeRange([start, end]);
            }}
            startDate={timeRange[0]}
            endDate={timeRange[1]}
            selectsRange
            inline
          />
        </div>
      )}
      {setup.dimensions.map((dimension) => (
        <div className={styles.item} key={`dimension-${dimension.label}`}>
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
