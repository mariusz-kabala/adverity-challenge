import { useState, useRef, useCallback } from "react";
import { useOutsideClick } from "./useOutsideClick";

export const useDropdown = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const onClickOutside = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback((e?: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e && e.stopPropagation();
    setIsOpen((value) => !value);
  }, []);
  useOutsideClick(wrapperRef, onClickOutside);

  return { isOpen, wrapperRef, toggle }
};
