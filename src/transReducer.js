const TransactionReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TRANSACTION": {
      return [action.payload, ...state];
    }
    case "REMOVE_TRANSACTION": {
      return state.filter((transaction) => transaction.id !== action.payload.id);
    }
    default:
      return state;
  }
};

export default TransactionReducer;
