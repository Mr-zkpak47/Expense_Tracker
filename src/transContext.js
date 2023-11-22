import React, { createContext, useReducer } from "react";
import TransactionReducer from "./transReducer";

const initialTransactions = [
  { amount: 500, desc: "Cash" },
  { amount: -50, desc: "Book" },
  { amount: 100, desc: "Camera" },
  { amount: -200, desc: "Camera" },
];

export const TransactionContext = createContext(initialTransactions);

export const TransactionProvider = ({ children }) => {
  let [state, dispatch] = useReducer(TransactionReducer, initialTransactions);

  function addTransaction(transObj) {
    dispatch({
      type: "ADD_TRANSACTION",
      payload: {
        amount: transObj.amount,
        desc: transObj.desc,
      },
    });
  }

  const delTransaction = (id) => {
    dispatch({
      type: "REMOVE_TRANSACTION",
      payload: id,
    });
  };
  return (
    <TransactionContext.Provider
      value={{
        transactions: state,
        addTransaction,
        delTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
