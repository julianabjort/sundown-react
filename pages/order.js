import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import OrderContext from "../contexts/order.js";
import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";
import { CaretForwardOutline } from "react-ionicons";
import { CaretBackOutline } from "react-ionicons";

function order() {
  const router = useRouter();
  const [order, setOrder] = useContext(OrderContext);
  const [people, setPeople] = useState(1);
  const [date, setDate] = useState(null);
  const [email, setEmail] = useState(null);
  const [error, setError] = useState("");
  const handleInput = (event) => {
    setEmail(event.target.value);
  };
  const validEmail = (email) => {
    var re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  useEffect(() => {
    setDate(new Date());
  }, []);

  useEffect(() => {
    if (order.date) {
      saveToLocalStorage();
      router.push("/receipt");
    }
  }, [order]);

  const completeOrder = () => {
    setError("");
    if (!email) {
      setError("Please provide email");
    } else if (!validEmail(email)) {
      setError("Valid email required.");
    } else {
      saveToState();
    }
  };

  const saveToState = () => {
    const newObj = {
      ...order,
      people: people,
      email: email,
      date: date,
    };
    setOrder(newObj);
  };

  const saveToLocalStorage = () => {
    if (typeof window !== "undefined") {
      let orders = JSON.parse(localStorage.getItem("orders"));
      if (orders === null) orders = [];
      orders.push(order);
      localStorage.setItem("orders", JSON.stringify(orders));
    }
  };

  const increment = () => {
    if (people < 10) setPeople(people + 1);
  };
  const decrement = () => {
    if (people > 1) setPeople(people - 1);
  };
  return (
    <div className="flex space-x-4 border-2 p-4">
      <div className="w-1/2">
        <h1 className="heading-1">When?</h1>
        {date && <DateTimePicker onChange={setDate} value={date} />}
      </div>
      <div className="w-1/2">
        <h1 className="heading-1">How many people?</h1>
        <div className="flex items-center">
          <div onClick={decrement} className="cursor-pointer">
            <CaretBackOutline height="30px" width="30px" />
          </div>
          <p className="font-bold text-4xl"> {people} </p>
          <div onClick={increment}>
            <CaretForwardOutline
              height="30px"
              width="30px"
              className="cursor-pointer"
            />
          </div>
        </div>
        <p className="mb-2">Enter e-mail</p>
        <input
          type="email"
          name="email"
          onChange={handleInput}
          className="w-full border-2 rounded-xl p-1"
        />
        {/* <Link href="/receipt"> */}
        <button
          onClick={() => {
            completeOrder();
          }}
          className="btn-primary w-1/3 my-4"
        >
          next
        </button>
        {/* </Link> */}
        <p className="text-red-500">{error}</p>
      </div>
    </div>
  );
}

export default order;
