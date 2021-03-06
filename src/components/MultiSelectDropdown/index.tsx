import React, { FC, useMemo } from "react";
import { useDropdown, useSearch } from "hooks";
import { IoIosArrowDown, IoIosArrowUp, IoIosClose } from "react-icons/io";
import { DropdownOptions } from "components/DropdownOptions";
import styles from "./styles.module.scss";

export const MultiSelectDropdown: FC<{
  options: string[];
  selected: string[];
  placeholder?: string;
  onAdd: (value: string) => void;
  onRemove: (value: string) => void;
}> = ({
  options,
  selected,
  onAdd,
  onRemove,
  placeholder = "Select a value",
}) => {
  const { isOpen, wrapperRef, toggle } = useDropdown();
  const { query, setQuery, filtered } = useSearch(options);

  const isSearchEnabled = useMemo(() => options.length > 10, [options]);

  return (
    <div ref={wrapperRef}>
      <div className={styles.content}>
        <ul onClick={toggle}>
          {selected.length === 0 && (
            <li className={styles.placeholder}>{placeholder}</li>
          )}
          {selected.map((s) => (
            <li key={`selected-${s}`}>
              <i
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(s);
                }}
              >
                <IoIosClose />
              </i>
              <span>{s}</span>
            </li>
          ))}
        </ul>
        <i onClick={toggle}>
          {isOpen && <IoIosArrowDown />}
          {!isOpen && <IoIosArrowUp />}
        </i>
      </div>
      {isOpen && options.length > 0 && (
        <div className={styles.options}>
          {isSearchEnabled && (
            <div className={styles.search}>
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
              />
            </div>
          )}
          <DropdownOptions
            options={isSearchEnabled ? filtered : options}
            onAdd={onAdd}
          />
        </div>
      )}
    </div>
  );
};
