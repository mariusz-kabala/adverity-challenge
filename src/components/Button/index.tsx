import React, { FC } from "react";

export const Button: FC<{ label: string; onClick: () => void }> = ({
  label,
  onClick,
}) => {
  return <button onClick={onClick}>{label}</button>;
};
