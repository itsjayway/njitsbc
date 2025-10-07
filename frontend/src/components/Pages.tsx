import React from "react";
import Button from "./Button";

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
  return (
    <div>
      <div className="flex justify-center items-center space-x-4 mb-4 w-full h-full">
        {totalPages > 1 && (
          <Button
            content="Previous"
            onClick={onPrev}
            disabled={page === 0}
            className={`bg-gray-700 rounded disabled:opacity-50${
              page === 0 ? " opacity-0 pointer-events-none" : ""
            }`}
          />
        )}
        <div>{children}</div>
        {totalPages > 1 && (
          <Button
            onClick={onNext}
            disabled={page >= totalPages - 1}
            className={`bg-gray-700 rounded disabled:opacity-50${
              page >= totalPages - 1 ? " opacity-0 pointer-events-none" : ""
            }`}
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
              className={`${
                i === page ? "bg-njit-red" : "bg-gray-700"
              } rounded disabled:opacity-50`}
              disabled={i === page}
            />
          ))}
        </div>
      )}
    </div>
  );
}
