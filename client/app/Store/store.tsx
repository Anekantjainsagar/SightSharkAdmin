import { createStore } from "redux";

let reducer = (state = [], action: any) => {
  switch (action.type) {
    case "item":
      return [...state, action.payload];
    default:
      return state;
  }
};

const store = createStore(reducer);
export default store;
