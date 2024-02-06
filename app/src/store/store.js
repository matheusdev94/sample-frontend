// store.js
import { createStore } from "redux";
import rootReducer from "./reducers"; // Você precisará criar este arquivo

const store = createStore(rootReducer);

export default store;
