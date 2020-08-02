import React, { useState, useCallback } from "react";
import {
  IDataContext,
  DataContext,
  DataChangerContext,
  SetupContext,
  SetupChangerContext,
  ISetupContext,
  IDataPayload,
  IFiltersContext,
  FiltersContext,
  ApplyFilterContext,
} from "context";
import { Wizard } from "components/Wizard";
import { Chart } from "components/Chart";
import { ReadMe } from "components/ReadMe";
import styles from "./styles.module.scss";
function App() {
  const [data, setData] = useState<IDataContext>({
    data: [],
    unique: {},
  });
  const [setup, setSetup] = useState<ISetupContext>({
    time: null,
    dimensions: [],
    metrics: [],
    allOptions: [],
    availableOptions: [],
    dateFormat: "dd.MM.yyyy",
    timeRange: [],
  });

  const [filters, setFilter] = useState<IFiltersContext>({
    applied: {},
    timeRange: [],
  });

  const onSetData = useCallback((payload: IDataPayload) => {
    const { data, unique, options } = payload;
    const formattedOptions = options.map((label, index) => ({ label, index }));

    setSetup((value) => ({
      ...value,
      time: null,
      timeRange: [],
      dimensions: [],
      metrics: [],
      allOptions: [...formattedOptions],
      availableOptions: [...formattedOptions],
    }));

    setData({
      data,
      unique,
    });
  }, []);

  const applyFilter = useCallback(
    (filter: string, values: string[] | Date[]) => {
      if (filter === "timeRange") {
        return setFilter((filters) => ({
          ...filters,
          timeRange: values as Date[],
        }));
      }

      setFilter((filters) => ({
        ...filters,
        applied: {
          ...filters.applied,
          [filter]: values as string[],
        },
      }));
    },
    []
  );

  return (
    <div className={styles.wrapper}>
      <ReadMe />
      <DataChangerContext.Provider value={onSetData}>
        <DataContext.Provider value={data}>
          <SetupChangerContext.Provider value={setSetup}>
            <SetupContext.Provider value={setup}>
              <ApplyFilterContext.Provider value={applyFilter}>
                <FiltersContext.Provider value={filters}>
                  <div className={styles.left}>
                    <Wizard />
                  </div>
                  <div className={styles.right}>
                    <Chart />
                  </div>
                </FiltersContext.Provider>
              </ApplyFilterContext.Provider>
            </SetupContext.Provider>
          </SetupChangerContext.Provider>
        </DataContext.Provider>
      </DataChangerContext.Provider>
    </div>
  );
}

export default App;
