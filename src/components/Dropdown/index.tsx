import React, { FC, useCallback } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useDropdown } from "hooks";
import { DropdownOptions } from 'components/DropdownOptions'
import styles from "./styles.module.scss";

export const Dropdown: FC<{
  options: string[];
  selected?: string;
  placeholder?: string
  onSelect: (value: string) => void;
}> = ({ options, selected, onSelect, placeholder = 'Select a value' }) => {
  const { isOpen, wrapperRef, toggle } = useDropdown();

  const onAdd = useCallback((value) => {
    onSelect(value);
    toggle();
  }, [onSelect, toggle])

  return (
    <div data-testid="dropdown" ref={wrapperRef}>
      <div className={styles.content} onClick={toggle}>
        <span>{selected || placeholder}</span>
        <i onClick={toggle}>
          {isOpen && <IoIosArrowDown />}
          {!isOpen && <IoIosArrowUp />}
        </i>
      </div>
      {isOpen && (
        <div className={styles.options}>
          <DropdownOptions options={options} onAdd={onAdd} />
        </div>
      )}
    </div>
  );
};
