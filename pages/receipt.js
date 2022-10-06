import React from "react";
import Link from "next/link";
import { useContext, useEffect } from "react";
import OrderContext from "../contexts/order.js";
import { useRouter } from "next/router";

function receipt() {
  const router = useRouter();
  const [order, setOrder] = useContext(OrderContext);
  const dishes = order.dishes;
  const drinks = order.drinks;

  useEffect(() => {
    if (!order.isUpdating && (!order.dishes.length || !order.email)) {
      router.push("/dish");
    }
  });

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <div>
      <h1 className="heading-1 pb-2">Your order is confirmed!</h1>
      <div className="flex w-full border-y-2 space-x-12 py-6">
        <div className="w-1/3">
          <p className="font-bold text-sm">Order Date</p>
          <p>{formatDate(order.date)}</p>
        </div>
        <div className="w-1/3">
          <p className="font-bold text-sm">Amount of people</p>
          <p>{order.people}</p>
        </div>
        <div className="w-1/3">
          <p className="font-bold text-sm">Order Email</p>
          <p>{order.email}</p>
        </div>
      </div>
      <p className="font-bold mt-4">Items:</p>
      {dishes.map((dish) => (
        <li className="my-1" key={dish.name}>
          {dish.name}
        </li>
      ))}
      {drinks.map((drink) => (
        <li className="my-1" key={drink.name}>
          {drink.name}
        </li>
      ))}
      <Link href="/">
        <button className="btn-primary w-1/3 my-4">Back to Home</button>
      </Link>
    </div>
  );
}

export default receipt;
