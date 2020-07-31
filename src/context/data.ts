import { createContext } from "react";

export interface IDataContext {
  data: {[field: string]: string}[];
  unique: {
    [field: string]: string[];
  };
}

export const DataContext = createContext<IDataContext>({
  data: [],
  unique: {},
});

export type IDataPayload = IDataContext & {options: string[]}

export type IDataChangerContext = (payload: IDataPayload) => void;

export const DataChangerContext = createContext<IDataChangerContext>(() => {});
