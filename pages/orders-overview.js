import { useContext, useState, useEffect } from "react";
import OrderContext from "../contexts/order.js";
import { useRouter } from "next/router";

function ordersOverview() {
  const router = useRouter();
  const [order, setOrder] = useContext(OrderContext);
  const [allOrders, setAllOrders] = useState([]);

  const getOrders = () => {
    if (typeof window !== "undefined") {
      let orders = JSON.parse(localStorage.getItem("orders"));
      if (orders === null) orders = [];
      const userOrders = orders.filter(
        (userOrder) => userOrder.email === order.email
      );
      setAllOrders(userOrders);
    }
  };
  useEffect(() => {
    getOrders();
  }, []);

  const updateOrder = (order) => {
    const newObj = {
      ...order,
      isUpdating: true,
    };
    setOrder(newObj);
    router.push("/dish");
  };

  return (
    <div className="mx-20">
      <h1 className="heading-1">Your orders</h1>
      <div className="grid grid-cols-2">
        {allOrders?.map((order, index) => (
          <div
            className="m-2 flex flex-col justify-between bg-gray-100 rounded-lg"
            key={index}
          >
            <div className="p-4 flex flex-col space-y-2">
              <h2 className="font-bold">Order {index + 1}</h2>

              {order.dishes.map((dish, subindex) => (
                <div key={subindex} className="flex space-x-2">
                  <img
                    src={dish.image}
                    alt="dish"
                    className="w-16 rounded-lg"
                  />
                  <p>{dish.name}</p>
                </div>
              ))}
              {order.drinks.map((drink, subindex) => (
                <div key={subindex} className="flex space-x-2">
                  <div className="w-16 aspect-square relative rounded-lg bg-white py-2 shadow-sm">
                    <img
                      src={drink.image}
                      alt="drink"
                      className="rounded-md w-auto object-fit h-full m-auto"
                    />
                  </div>
                  <p>{drink.name}</p>
                </div>
              ))}
            </div>
            <div>
              <button
                onClick={() => updateOrder(order)}
                className="btn-secondary w-1/3 ml-4 mb-4"
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ordersOverview;
