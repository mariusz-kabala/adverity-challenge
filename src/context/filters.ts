import { createContext } from "react";

export type IFiltersContext = {
    applied: {
        [field: string]: string[]
    }, 
    timeRange: Date[]
}

export const FiltersContext = createContext<IFiltersContext>({
    applied: {},
    timeRange: [],
});

export const ApplyFilterContext = createContext<(filter: string, values: string[] | Date[]) => void>(() => null)
