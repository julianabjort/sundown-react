import React from "react";

function DrinksImage({ image }) {
  return (
    <div
      className="
            
            w-full
            aspect-square
            relative
            cursor-pointer
            rounded-lg
            bg-gray-100
            py-2
            shadow-sm
          "
    >
      <img
        src={image}
        alt="drink"
        className="rounded-md
                  w-auto
                  cursor-pointer
                  object-fit
                  h-full
                
                  m-auto"
      />
    </div>
  );
}

export default DrinksImage;
