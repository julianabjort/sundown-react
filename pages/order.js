import { useContext, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import OrderContext from "../contexts/order.js";
import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";
import { CaretForwardOutline } from "react-ionicons";
import { CaretBackOutline } from "react-ionicons";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Datepicker, setOptions } from "@mobiscroll/react";

function order() {
  const router = useRouter();
  const [order, setOrder] = useContext(OrderContext);
  const [people, setPeople] = useState(1);
  const [date, setDate] = useState(new Date());
  const [email, setEmail] = useState(null);
  const [orderSaved, setOrderSaved] = useState(false);
  const [error, setError] = useState("");
  const handleInput = (event) => {
    setEmail(event.target.value);
  };
  const validEmail = (email) => {
    var re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  setOptions({
    theme: "ios",
    themeVariant: "light",
  });

  useEffect(() => {
    // setDate(new Date());
    if (!order.isUpdating && !order.dishes.length) {
      router.push("/dish");
    }
  }, []);

  useEffect(() => {
    console.log(date);
  }, [date]);

  useEffect(() => {
    if (orderSaved) {
      saveToLocalStorage();
      router.push("/receipt");
    }
  }, [order]);

  useEffect(() => {
    if (order.isUpdating) {
      setDate(order.date);
      setPeople(order.people);
      setEmail(order.email);
    }
  }, []);

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
    setOrderSaved(true);
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

  const onChange = (event) => {
    setDate(new Date(event.value));
  };

  // const setToday = (event) => {
  //   setDate(new Date());
  // };

  // const defaultSelection = new Date();

  return (
    <div className="flex space-x-4 p-4">
      <div className="w-1/2 px-6">
        <h1 className="heading-1 mb-4">When?</h1>
        <Datepicker
          value={date}
          onChange={(event) => onChange(event)}
          controls={["calendar", "time"]}
          display="inline"
          timeFormat="HH:ii:ss"
          selectMultiple={false}
          valid={[
            {
              start: "16:00",
              end: "23:00",
              recurring: { repeat: "weekly", weekDays: "MO,TU,WE,TH,FR" },
            },
          ]}
          invalid={[
            {
              recurring: {
                repeat: "weekly",
                weekDays: "SA,SU",
              },
            },
          ]}
        />
        {/* {date && <DateTimePicker onChange={setDate} value={date} />} */}
      </div>
      <div className="w-1/2">
        <h1 className="heading-1 mb-4">How many people?</h1>
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
          value={email ? email : ""}
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
