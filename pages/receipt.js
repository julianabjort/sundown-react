import React from "react";
import { useContext } from "react";
import ClickContext from "../contexts/click";

function receipt() {
  const amount = useContext(ClickContext);
  return <div>{amount}</div>;
}

export default receipt;
