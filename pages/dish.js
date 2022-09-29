import React from "react";
import Header from "../components/Header";
import Image from "next/image";

function dish({ dishes, ingredients }) {
  const ingredientsJoined = ingredients.join(", ");
  return (
    <div className="flex space-x-8">
      <div className="w-2/3">
        <div className="bg-gray-100 rounded-b-lg">
          {dishes.map((dish) => (
            <div key={dish.id} className="w-full">
              <img
                src={dish.image}
                alt=""
                className="w-full h-72 object-cover rounded-t-lg"
              />
              <div className="flex flex-col space-y-4 p-6">
                <h1 className="heading-1 ml-2">{dish.title}</h1>
                <div className="flex space-x-2">
                  <p className="bg-light rounded-full px-4 py-1">
                    {dish.category}
                  </p>
                  <p className="bg-light rounded-full px-4 py-1">
                    {dish.ethnicity}
                  </p>
                </div>
                <p className="ml-2">{ingredientsJoined}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex space-x-4 mt-4">
          <button className="btn-primary w-full">Generate New</button>
          <button className="btn-primary w-full">Add to order</button>
        </div>
      </div>
      <div className="w-1/3 h-96 flex flex-col space-y-4">
        <div className="w-full h-full bg-gray-100 rounded-lg p-6 flex flex-col justify-between">
          <h1 className="heading-1 border-b-2">Your Order</h1>
        </div>
        <button className="btn-primary w-full">Continue to drinks</button>
      </div>
    </div>
  );
}
export async function getStaticProps() {
  const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
  const data = await res.json();
  const dishes = data.meals.map((dish) => {
    return {
      id: dish.idMeal,
      title: dish.strMeal,
      image: dish.strMealThumb,
      category: dish.strCategory,
      ethnicity: dish.strArea,
    };
  });
  const ingredients = data.meals.map((dish) => {
    return [
      dish.strIngredient1,
      dish.strIngredient2,
      dish.strIngredient3,
      dish.strIngredient4,
      dish.strIngredient5,
      dish.strIngredient6,
    ];
  });

  return {
    props: {
      dishes,
      ingredients,
    },
  };
}

export default dish;
