import { useContext, useCallback } from "react";
import { FiltersContext, ApplyFilterContext } from "context";

export const useFilters = () => {
  const filters = useContext(FiltersContext);
  const applyFilter = useContext(ApplyFilterContext);
  const getAppliedFilters = useCallback(
    (filter: string) => {
      return filters.applied[filter] || [];
    },
    [filters]
  );

  const getAddFilterValue = (filter: string) => (value: string) => {
    const values = getAppliedFilters(filter);

    if (!values.includes(value)) {
      applyFilter(filter, [...values, value]);
    }
  };

  const getRemoveFilterValue = (filter: string) => (value: string) => {
    const values = getAppliedFilters(filter);
    const index = values.indexOf(value);

    if (index > -1) {
      values.splice(index, 1);

      applyFilter(filter, [...values]);
    }
  };

  const changeTimeRange = useCallback((timeRange: Date[]) => {
    applyFilter('timeRange', timeRange)
  }, [applyFilter])

  return {
    getAppliedFilters,
    getAddFilterValue,
    getRemoveFilterValue,
    changeTimeRange,
    ...filters
  };
};
