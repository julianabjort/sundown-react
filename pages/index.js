import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import OrderContext from "../contexts/order.js";
import ImageSlider from "../components/ImageSlider.js";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

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
    let orders = JSON.parse(localStorage.getItem("orders"));
    if (orders === null) orders = [];
    const userOrders = orders.filter((userOrder) => userOrder.email === email);

    if (userOrders.length) {
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
      <main className="flex flex-col space-y-4 mb-10">
        <section className="flex space-x-4">
          <div className="p-5 w-3/5 h-[370px] border-2">
            <ImageSlider />
          </div>
          <div className="p-6 w-2/5 h-84 border-2 flex flex-col justify-between">
            <h1 className="heading-1">Order Flow</h1>
            <Link href="/dish">
              <button onClick={resetState} className="btn-primary w-full">
                Order
              </button>
            </Link>
          </div>
        </section>

        <section className="flex space-x-4 mb-10">
          <div className="flex flex-col space-y-2 p-6 w-1/2 h-56 border-2">
            <h1 className="heading-1">Find your order</h1>
            <p>Enter Email</p>
            <input onChange={handleInput} type="email" className="input" />
            <button onClick={findOrders} className="btn-primary w-1/3">
              Find
            </button>
            <p className="error">{error}</p>
          </div>
          <div className="p-6 w-1/2 h-56 border-2">
            <h1 className="heading-1">Content</h1>
          </div>
        </section>
      </main>
    </div>
  );
}
