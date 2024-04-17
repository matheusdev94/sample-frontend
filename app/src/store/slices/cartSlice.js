import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  isCartOpen: false,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toogleCart(state) {
      state.isCartOpen = !state.isCartOpen;
    },
    addItem(state, action) {
      const newItem = action.payload;
      const serch = state.items.find((el) => el.name === newItem.name);
      if (serch) return;
      state.items.push(newItem);
      // alert(`ci: ${JSON.stringify(state)}`);
    },
    removeItem(state, action) {
      const newItem = action.payload;
      const filtered = state.items.filter((el) => el.name !== newItem.name);
      state.items = filtered;
    },
  },
});
export const { addItem, removeItem, toogleCart } = cartSlice.actions;
export default cartSlice.reducer;
