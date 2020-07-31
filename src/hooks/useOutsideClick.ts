import { useEffect, RefObject } from "react";

export const useOutsideClick = (ref: RefObject<HTMLElement>, onClick: () => void) => {
  useEffect(() => {
    const handleClick = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClick();
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, onClick]);
};
