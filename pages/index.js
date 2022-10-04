import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import OrderContext from "../contexts/order.js";

export default function Home() {
  const router = useRouter();
  const [order, setOrder] = useContext(OrderContext);
  const [email, setEmail] = useState(null);
  const [error, setError] = useState("");
  const resetState = () => {
    const emptyObj = {
      dishes: [],
      drinks: [],
      date: null,
      people: 1,
      email: null,
    };
    setOrder(emptyObj);
  };
  const handleInput = (event) => {
    setEmail(event.target.value);
  };
  const findOrders = () => {
    setError("");
    let allOrders = JSON.parse(localStorage.getItem("orders"));
    const orders = allOrders.filter(
      (storedOrder) => storedOrder.email === email
    );
    console.log(orders);

    if (orders.length) {
      const newObj = {
        ...order,
        email: email,
      };
      setOrder(newObj);
    } else {
      setError("No orders associated with this email");
    }
  };

  useEffect(() => {
    console.log(order);
    if (email) {
      router.push("/orders-overview");
    }
  }, [order]);
  return (
    <div>
      <main className="flex flex-col space-y-4">
        <section className="flex space-x-4">
          <div className="p-6 w-2/3 h-72 border-2">
            <h1 className="heading-1">Images</h1>
          </div>
          <div className="p-6 w-1/3 h-72 border-2 flex flex-col justify-between">
            <h1 className="heading-1">Order Flow</h1>
            <Link href="/dish">
              <button onClick={resetState} className="btn-primary w-full">
                Order
              </button>
            </Link>
          </div>
        </section>

        <section className="flex space-x-4">
          <div className="flex flex-col space-y-4 p-6 w-1/2 h-72 border-2">
            <h1 className="heading-1">Find your order</h1>
            <p>Enter Email</p>
            <input onChange={handleInput} type="text" className="input" />
            <button onClick={findOrders} className="btn-primary w-1/3">
              Find
            </button>
            <p className="error">{error}</p>
          </div>
          <div className="p-6 w-1/2 h-72 border-2">
            <h1 className="heading-1">Content</h1>
          </div>
        </section>
      </main>
    </div>
  );
}
