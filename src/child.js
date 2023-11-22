import React, { useContext, useState } from "react";
import { TransactionContext } from "./transContext";

const Child = () => {
  let { transactions, addTransaction, delTransaction } =
    useContext(TransactionContext);
  const [newDesc, setDesc] = useState("");
  const [newAmount, setAmount] = useState("");

  const handleAddition = (e) => {
    e.preventDefault();
    if (Number(newAmount) === 0) {
      alert("Please enter a correct amount.");
      return false;
    }
    addTransaction({
      amount: Number(newAmount),
      desc: newDesc,
    });
  };

  const handleDelete = (e, transaction) => {
    e.preventDefault();
    if (transaction && transaction.id) {
      delTransaction(transaction);
    }
  };

  const getIncome = () => {
    let income = 0;
    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i].amount > 0) {
        income += transactions[i].amount;
      }
    }
    return income;
  };

  const getExpense = () => {
    let expense = 0;
    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i].amount < 0) {
        expense += Math.abs(transactions[i].amount); // Use Math.abs to calculate the absolute value of expense
      }
    }
    return expense;
  };

  const handleHover = (e) => {
    e.target.classList.add("hovered");
  };

  const handleLeave = (e) => {
    e.target.classList.remove("hovered");
  };

  return (
    <div className="container">
      <h1 className="text-center text-2xl font-bold mb-5">Expense Tracker</h1>
      <h3 className="font-bold text-bs uppercase flex flex-col justify-center gap-0 mb-5">
        <span>Your Balance</span>
        <span className="font-bold text-2xl mt-0 pt-0">
          ${getIncome() + getExpense()}.00
        </span>
      </h3>
      <div className="expense-container shadow-lg flex justify-center items-center p-3 mb-5 gap-5">
        <span className="flex flex-col items-center">
          <span className="font-bold text-bs">INCOME</span>
          <span className="text-xl font-bold text-teal-500">${getIncome()}.00</span>
        </span>
        <span className="flex flex-col items-center">
          <span className="font-bold text-bs">EXPENSE</span>
          <span className="text-xl font-bold text-rose-400">${getExpense()}.00</span>
        </span>
      </div>
      <h3 className="mb-1 font-bold">History</h3>
      <hr className="h-0.5 w-full bg-gray-400 mb-2"></hr>
      <ul className="transaction-list">
        {transactions.map((transObj, ind) => {
          return (
            <li
              key={transObj.id}
              id={`transaction-${ind}`}
              className="h-11 flex font-semibold"
              // className={hoveredId === transObj.id ? 'hovered' : ''}
            >
              <div
                className="flex-1 cursor-pointer px-2"
                onMouseEnter={(e) => {
                  e.preventDefault();
                  handleHover(e);
                }}
                onMouseLeave={(e) => {
                  e.preventDefault();
                  handleLeave(e);
                }}
              >
                <span>{transObj.desc}</span>
                <span>{transObj.amount}.00</span>
              </div>
              <span className="flex-2 absolute flex gap-2 bg-indigo-500 h-full top-0 justify-center items-center px-2 z-10 transition">
                <span>
                  <i className="fa-regular fa-newspaper fa-lg text-gray-600 cursor-pointer hover:text-gray-800 transition"></i>
                </span>
                <span onClick={(e) => handleDelete(e, transObj)}>
                  <i className="fa-solid fa-xmark fa-lg text-gray-600 cursor-pointer hover:text-gray-800 transition"></i>
                </span>
              </span>
            </li>
          );
        })}
      </ul>
      <h3 className="mb-1 font-bold mt-3">Add new transaction</h3>
        <hr className="h-0.5 w-full bg-gray-400 mb-2"></hr>
      <form className="transaction-form" onSubmit={handleAddition}>
        <label>
          Enter Description:
          <br />
          <input
            className="focus:outline-none shadow border border-gray-300 rounded py-2 text-gray-700 leading-tight focus:shadow-outline"
            type="text"
            onChange={(e) => setDesc(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Enter Amount:
          <br />
          <input
            className="focus:outline-none shadow border border-gray-300 rounded py-2 text-gray-700 leading-tight focus:shadow-outline"
            type="number"
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </label>
        <input
          className="font-bold uppercase bg-indigo-500 text-white tracking-wider hover:bg-indigo-600 cursor-pointer rounded"
          type="submit"
          value="Add transaction"
        />
      </form>
    </div>
  );
};
export default Child;
