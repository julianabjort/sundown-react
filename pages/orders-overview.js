import { useContext, useState, useEffect } from "react";
import OrderContext from "../contexts/order.js";

function ordersOverview() {
  const [order, setOrder] = useContext(OrderContext);
  const [allOrders, setAllOrders] = useState([]);

  const getOrders = () => {
    if (typeof window !== "undefined") {
      let storedOrders = JSON.parse(localStorage.getItem("orders"));
      const orders = storedOrders.filter(
        (storedOrder) => storedOrder.email === order.email
      );
      setAllOrders(orders);
    }
  };
  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div>
      <h1 className="heading-1">Your orders</h1>
      <ul>
        {allOrders?.map((order, index) => (
          <li className="my-1" key={index}>
            <h2 className="font-bold">Order {index + 1}</h2>
            {order.dishes.map((dish, subindex) => (
              <p key={subindex}>{dish.name}</p>
            ))}
            {order.drinks.map((drink, subindex) => (
              <p key={subindex}>{drink.name}</p>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ordersOverview;
