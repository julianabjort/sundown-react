import { useContext } from "react";
import ClickContext from "../contexts/click";
import Link from "next/link";

const test = () => {
  const [clickAmount, increment] = useContext(ClickContext);

  return (
    <>
      You clicked the button <strong>{clickAmount}</strong> times.
      <button onClick={increment}>Click me!</button>
      <Link href="/receipt">
        <button className="btn-primary w-1/4">Order</button>
      </Link>
    </>
  );
};

export default test;
