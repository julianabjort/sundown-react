import React from "react";

function OrderCard({ number, dishImage, dish, drinkImage, drink }) {
  return (
    <div className="flex flex-col space-y-2 my-4 bg-gray-100 rounded-lg">
      <h2 className="font-bold">Order {number} </h2>
      <div className="flex space-x-2">
        <img src={dishImage} alt="" className="w-10 rounded-lg" />
        <p>{dish}</p>
      </div>
      <div className="flex space-x-2">
        <img src={drinkImage} alt="" className="w-10 rounded-lg" />
        <p>{drink}</p>
      </div>
    </div>
  );
}
export default OrderCard;
