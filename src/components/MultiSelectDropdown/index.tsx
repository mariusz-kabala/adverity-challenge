import React, { FC, useMemo } from "react";
import { useDropdown, useSearch } from "hooks";
import { IoIosArrowDown, IoIosArrowUp, IoIosClose } from "react-icons/io";
import { DropdownOptions } from 'components/DropdownOptions'
import styles from "./styles.module.scss";

export const MultiSelectDropdown: FC<{
  options: string[];
  selected: string[];
  onAdd: (value: string) => void;
  onRemove: (value: string) => void;
}> = ({ options, selected, onAdd, onRemove }) => {
  const { isOpen, wrapperRef, toggle } = useDropdown();
  const { query, setQuery, filtered } = useSearch(options)

  const isSearchEnabled = useMemo(() => options.length > 10, [options])

  return (
    <div ref={wrapperRef}>
      <div className={styles.content}>
        <ul onClick={toggle}>
          {selected.map((s) => (
            <li key={`selected-${s}`}>
              <i onClick={(e) => { e.stopPropagation(); onRemove(s)}}>
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
      {isOpen && (
        <div className={styles.options}>
          {isSearchEnabled && (
            <div>
              <input type="text" value={query} onChange={(e) => {
                setQuery(e.target.value)
              }} />
            </div>
          )}
          <DropdownOptions options={(isSearchEnabled ? filtered : options)} onAdd={onAdd} />
        </div>
      )}
    </div>
  );
};
