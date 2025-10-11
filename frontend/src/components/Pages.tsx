import React from "react";
import Button from "./Button";
import classes from "../utils/classes";

interface PagesProps {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  setPage: (page: number) => void;
  children: React.ReactNode;
}

export default function Pages({
  page,
  totalPages,
  onPrev,
  onNext,
  setPage,
  children,
}: PagesProps) {
  const buttonColor = "bg-gray-300 rounded disabled:opacity-50 animate-pulse";
  const buttonDisabled = "pointer-events-none select-none";
  return (
    <>
      <div className="flex justify-center items-center space-x-4 mb-4">
        {totalPages > 1 && (
          <Button
            content="Prev"
            onClick={onPrev}
            disabled={page === 0}
            className={classes(buttonColor,
              page === 0 ? buttonDisabled : ""
            )}
          />
        )}
        {children}
        {totalPages > 1 && (
          <Button
            onClick={onNext}
            disabled={page >= totalPages - 1}
            className={classes(buttonColor,
              page >= totalPages - 1 ? buttonDisabled : ""
            )}
            content="Next"
          />
        )}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center mt-2 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i}
              content={(i + 1).toString()}
              onClick={() => setPage(i)}
              className={classes(
                i === page ? "bg-gray-400" : "bg-gray-200",
                "rounded disabled:opacity-50"
              )}
              disabled={i === page}
            />
          ))}
        </div>
      )}
    </>
  );
}
