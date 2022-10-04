import { useContext } from "react";
import OrderContext from "../contexts/order";
import Link from "next/link";

const test = () => {
  const [order, setOrder] = useContext(OrderContext);

  return <></>;
};

export default test;
