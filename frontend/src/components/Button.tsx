import React from "react";
import classes from "../utils/classes";

interface ButtonProps {
  text: string;
  className?: string;
  disabled?: boolean;
  onClick: () => void;
}

export default function Button({
  text,
  className,
  disabled,
  onClick,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={classes(className, "font-semibold px-3 py-1 rounded-xl transition")}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
