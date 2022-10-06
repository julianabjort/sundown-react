import React from "react";
import { useContext, useEffect, useState } from "react";
import OrderContext from "../contexts/order.js";
import Link from "next/link";
import DrinksGrid from "../components/DrinksGrid.js";
import DrinksImage from "../components/DrinksImage.js";
import { CheckmarkCircle } from "react-ionicons";
import { useRouter } from "next/router";

function drinks() {
  const router = useRouter();
  const [order, setOrder] = useContext(OrderContext);
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDrinks, setSelectedDrinks] = useState([]);

  const fetchData = async () => {
    const response = await fetch("https://api.punkapi.com/v2/beers");
    const data = await response.json();
    const drinks = data.map((drink) => {
      const selected = order.drinks.find(
        (selectedDrink) => selectedDrink.name === drink.name
      );
      return {
        name: drink.name,
        image: drink.image_url,
        selected: selected,
      };
    });
    setDrinks(drinks);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (order.drinks.length) {
      setSelectedDrinks(order.drinks);
    }
    if (!order.isUpdating && !order.dishes.length) {
      router.push("/dish");
    }
  }, []);

  const selectDrink = (drink) => {
    if (!drink.selected) {
      drink.selected = true;
      setSelectedDrinks([...selectedDrinks, drink]);
    } else {
      drink.selected = false;
      const removeDrink = selectedDrinks.filter(
        (selectedDrink) => selectedDrink.name !== drink.name
      );
      setSelectedDrinks(removeDrink);
    }
  };

  const addToOrder = () => {
    const newObj = { ...order, drinks: selectedDrinks };
    setOrder(newObj);
  };

  return (
    <div className="flex">
      <div className="w-2/3">
        <DrinksGrid>
          {drinks.map((drink) => {
            return (
              <div
                className="relative"
                key={drink.name}
                onClick={() => selectDrink(drink)}
              >
                {drink.selected ? (
                  <div className="absolute z-10 top-1 right-1">
                    <CheckmarkCircle
                      color={"green"}
                      height="30px"
                      width="30px"
                    />
                  </div>
                ) : null}
                <DrinksImage image={drink.image} />
              </div>
            );
          })}
        </DrinksGrid>
      </div>

      <div className="w-1/3">
        <Link href="/order">
          <button onClick={addToOrder} className="btn-primary w-1/2">
            Next
          </button>
        </Link>
      </div>
    </div>
  );
}
// export async function getStaticProps() {
//   const res = await fetch("https://api.punkapi.com/v2/beers");
//   const data = await res.json();
//   const drinks = data.map((drink) => {
//     return {
//       name: drink.name,
//       image: drink.image_url,
//       selected: false,
//     };
//   });

//   return {
//     props: {
//       drinks,
//     },
//   };
// }

export default drinks;
