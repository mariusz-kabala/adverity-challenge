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
import { CSVUploader } from "components/CSVUploader";
import { Setup } from "components/Setup";
import { Filters } from "components/Filters";
import { Chart } from "components/Chart";

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
  });

  const [filters, setFilter] = useState<IFiltersContext>({});

  const onSetData = useCallback((payload: IDataPayload) => {
    const { data, unique, options } = payload;
    const formattedOptions = options.map((label, index) => ({ label, index }));

    setSetup({
      time: null,
      dimensions: [],
      metrics: [],
      allOptions: [...formattedOptions],
      availableOptions: [...formattedOptions],
    });

    setData({
      data,
      unique,
    });
  }, []);

  const applyFilter = useCallback((filter: string, values: string[]) => {
    setFilter((filters) => ({
      ...filters,
      [filter]: values,
    }));
  }, []);

  return (
    <div>
      <DataChangerContext.Provider value={onSetData}>
        <DataContext.Provider value={data}>
          <SetupChangerContext.Provider value={setSetup}>
            <SetupContext.Provider value={setup}>
              <ApplyFilterContext.Provider value={applyFilter}>
                <FiltersContext.Provider value={filters}>
                  <CSVUploader />
                  <Setup />
                  <Filters />
                  <Chart />
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
