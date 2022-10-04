import { createContext, useState } from "react";

const OrderContext = createContext({}, () => {});

export const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState({
    dishes: [],
    drinks: [],
    date: null,
    people: 1,
    email: null,
  });
  // const [clickAmount, setClickAmount] = useState(0);
  // const increment = () => setClickAmount((amount) => amount + 1);

  return (
    <OrderContext.Provider value={[order, setOrder]}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
