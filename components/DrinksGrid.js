import React from "react";

function DrinksGrid({ children }) {
  return (
    <div
      className="w-full
    h-auto
    p-2
    grid grid-cols-3
    gap-2
    grid-rows-auto
    mb-4"
    >
      {children}
    </div>
  );
}

export default DrinksGrid;
