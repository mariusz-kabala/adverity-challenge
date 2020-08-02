import React, { createContext } from "react";
import { ICsvField } from "types/csvField";

export interface ISetupContext {
  time: ICsvField | null;
  dimensions: ICsvField[];
  metrics: ICsvField[];
  allOptions: ICsvField[];
  availableOptions: ICsvField[];
  timeRange: Date[];
  dateFormat?: string
}

export const SetupContext = createContext<
  ISetupContext
>({
  time: null,
  dimensions: [],
  metrics: [],
  allOptions: [],
  availableOptions: [],
  dateFormat: "dd.MM.yyyy",
  timeRange: [],
});

export const SetupChangerContext = createContext<React.Dispatch<React.SetStateAction<ISetupContext>>>(
  () => {}
);
