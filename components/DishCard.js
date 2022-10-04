import React from "react";

function DishCard({
  image = "",
  name = "",
  category = "",
  ethnicity = "",
  ingredients = [],
}) {
  return (
    <div>
      <div className="bg-gray-100 rounded-b-lg">
        <div className="w-full">
          <img
            src={image}
            alt=""
            className="w-full h-72 object-cover rounded-t-lg"
          />
          <div className="flex flex-col space-y-4 p-6">
            <h1 className="heading-1 ml-2">{name}</h1>
            <div className="flex space-x-2">
              <p className="bg-light rounded-full px-4 py-1">{category}</p>
              <p className="bg-light rounded-full px-4 py-1">{ethnicity}</p>
            </div>
            <p className="ml-2">{ingredients}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DishCard;
