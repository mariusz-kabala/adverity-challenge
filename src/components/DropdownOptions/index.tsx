import React, { FC, memo } from "react";

export const DropdownOptions: FC<{
  options: string[];
  onAdd: (value: string) => void;
}> = memo(({ options, onAdd }) => {
  return (
    <ul data-testid="dropdown-options">
      {options.map((o) => (
        <li onClick={() => onAdd(o)} key={`option-${o}`}>
          {o}
        </li>
      ))}
    </ul>
  );
});
