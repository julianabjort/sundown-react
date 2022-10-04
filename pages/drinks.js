import React from "react";
import { useContext, useEffect, useState } from "react";
import OrderContext from "../contexts/order.js";
import Link from "next/link";
import DrinksGrid from "../components/DrinksGrid.js";
import DrinksImage from "../components/DrinksImage.js";
import { CheckmarkCircle } from "react-ionicons";

function drinks({ drinks }) {
  const [order, setOrder] = useContext(OrderContext);
  const [selectedDrinks, setSelectedDrinks] = useState([]);

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

  useEffect(() => {
    console.log("selected drinks updated", selectedDrinks);
  }, [selectedDrinks]);
  // useEffect(() => {
  //   console.log("order updated", order);
  // }, [order]);

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
export async function getStaticProps() {
  const res = await fetch("https://api.punkapi.com/v2/beers");
  const data = await res.json();
  const drinks = data.map((drink) => {
    return {
      name: drink.name,
      image: drink.image_url,
      selected: false,
    };
  });

  return {
    props: {
      drinks,
    },
  };
}

export default drinks;
