import { useState, useEffect, useContext } from "react";
import DishCard from "../components/DishCard";
import { useRouter } from "next/router";
import OrderContext from "../contexts/order.js";

function dish() {
  const router = useRouter();
  const [selectedDishes, setSelectedDishes] = useState([]);
  const [dish, setDish] = useState(null);
  const [ingredients, setIngredients] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [order, setOrder] = useContext(OrderContext);
  const [error, setError] = useState("");

  useEffect(() => {
    if (order.isUpdating) setSelectedDishes(order.dishes);
  }, []);

  const addDish = () => {
    setSelectedDishes([...selectedDishes, dish]);
  };

  const removeDish = (index) => {
    const dishRemoved = selectedDishes.filter(
      (_, dishIndex) => dishIndex !== index
    );
    setSelectedDishes(dishRemoved);
  };

  const addOrder = () => {
    setError("");
    if (!selectedDishes.length) {
      setError("Please select at least one dish");
    } else {
      const newObj = {
        ...order,
        dishes: selectedDishes,
      };
      setOrder(newObj);
      router.push("/drinks");
    }
  };

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
                <div className="flex justify-between">
                  <p> 1 x {dish.name} </p>
                  <button
                    onClick={() => removeDish(index)}
                    className="cursor-pointer"
                  >
                    x
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <button onClick={addOrder} className="btn-primary w-full">
          Continue to drinks
        </button>
        <p className="error mt-4">{error}</p>
      </div>
    </div>
  );
}

export default dish;
