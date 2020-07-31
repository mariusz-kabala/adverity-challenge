import { createContext } from "react";
import { ICsvField } from "types/csvField";

export interface ISetupContext {
  time: ICsvField | null;
  dimensions: ICsvField[];
  metrics: ICsvField[];
  allOptions: ICsvField[];
  availableOptions: ICsvField[];
}

export const SetupContext = createContext<ISetupContext>({
  time: null,
  dimensions: [],
  metrics: [],
  allOptions: [],
  availableOptions: [],
});

export const SetupChangerContext = createContext<
  (payload: ISetupContext) => void
>(() => {});
