import { useContext, useCallback } from "react";
import { IDataContext, DataContext } from "context";

export const useData = () => {
  const data = useContext<IDataContext>(DataContext);

  const getUnique = useCallback(
    (field: string) => {
      return data.unique[field] || [];
    },
    [data]
  );

  return { getUnique }
};
