import { useState, useEffect } from "react";
import DishCard from "../components/DishCard";
import Link from "next/link";
import { useContext } from "react";
import OrderContext from "../contexts/order.js";

function dish() {
  const [selectedDishes, setSelectedDishes] = useState([]);
  const addDish = () => {
    setSelectedDishes([...selectedDishes, dish]);
  };

  const [dish, setDish] = useState(null);
  const [ingredients, setIngredients] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [order, setOrder] = useContext(OrderContext);

  const addOrder = () => {
    const newObj = {
      ...order,
      dishes: selectedDishes,
    };
    setOrder(newObj);
  };

  // const addToOrder = () => {
  //   const newState = order.map((order) => {
  //     return { ...order, dishes: selectedDishes };
  //   });
  //   setOrder(newState);
  // };

  useEffect(() => {
    console.log("order updated", order);
  }, [order]);

  useEffect(() => {
    console.log("dishes updated", selectedDishes);
  }, [selectedDishes]);

  const fetchData = async () => {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    const data = await response.json();
    const dish = {
      id: data.meals[0].idMeal,
      name: data.meals[0].strMeal,
      image: data.meals[0].strMealThumb,
      category: data.meals[0].strCategory,
      ethnicity: data.meals[0].strArea,
    };

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

    setDish(dish);
    setIngredients(ingredients);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!dish) return <p>No dishes available</p>;

  return (
    <div className="flex space-x-8">
      <div className="w-2/3">
        <DishCard
          key={dish.id}
          image={dish.image}
          name={dish.name}
          category={dish.category}
          ethnicity={dish.ethnicity}
          ingredients={ingredients}
        />

        <div className="flex space-x-4 mt-4">
          <button onClick={fetchData} className="btn-primary w-full">
            Generate New
          </button>
          <button onClick={addDish} className="btn-primary w-full">
            Add to order
          </button>
        </div>
      </div>
      <div className="w-1/3 h-96">
        <div className="w-full h-full bg-gray-100 rounded-lg p-6 mb-4">
          <h1 className="heading-1 border-b-2">Your Order</h1>
          <ul>
            {selectedDishes.map((dish, index) => (
              <li className="my-1" key={`${dish.id} + ${index}`}>
                1 x {dish.name}
              </li>
            ))}
          </ul>
        </div>
        <Link href="/drinks">
          <button onClick={addOrder} className="btn-primary w-full">
            Continue to drinks
          </button>
        </Link>
      </div>
    </div>
  );
}

export default dish;
