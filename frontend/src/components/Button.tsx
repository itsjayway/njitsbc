import React from "react";
import classes from "../utils/classes";

interface ButtonProps {
  content: string;
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  onClick: () => void;
}

export default function Button({
  content,
  className,
  disabled,
  children,
  onClick,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={classes(
        className,
        "font-semibold rounded-xl transition px-5 py-3 leading-tight"
      )}
      disabled={disabled}
    >
      {content || children}
    </button>
  );
}
