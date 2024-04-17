// store.js
import { configureStore } from "@reduxjs/toolkit";

import languageSlice from "./slices/languageSlice";
import themeReducer from "./slices/themeSlice";
import cartReducer from "./slices/cartSlice";

export default configureStore({
  reducer: {
    language: languageSlice,
    theme: themeReducer,
    cart: cartReducer,
  },
});
