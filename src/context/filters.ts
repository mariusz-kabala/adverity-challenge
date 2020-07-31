import { createContext } from "react";

export type IFiltersContext = {[field: string]: string[]}

export const FiltersContext = createContext<IFiltersContext>({});

export const ApplyFilterContext = createContext<(filter: string, values: string[]) => void>(() => null)
