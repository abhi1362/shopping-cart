import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  cartTotalPrice: 0,
  cartTotalQuantity: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingIndex >= 0) {
        state.cartItems[existingIndex] = {
          ...state.cartItems[existingIndex],
          itemQuantity: state.cartItems[existingIndex].itemQuantity + 1,
        };
      } else {
        let tempState = { ...action.payload, itemQuantity: 1 };
        state.cartItems.push(tempState);
      }
    },
    getTotal(state) {
      let newTotalPrice = 0;
      let newTotalQuantity = 0;
      state.cartItems.forEach((item) => {
        newTotalPrice += item.price * item.itemQuantity;
        newTotalQuantity += item.itemQuantity;
      });
      state.cartTotalPrice = newTotalPrice;
      state.cartTotalQuantity = newTotalQuantity;
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cartItems[itemIndex].itemQuantity > 1) {
        state.cartItems[itemIndex].itemQuantity -= 1;
      } else if (state.cartItems[itemIndex].itemQuantity === 1) {
        let filterItems = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
        state.cartItems = filterItems;
      }
    }
  }
});

// Action creators are generated for each case reducer function
export const { decreaseCart, addToCart, getTotal } = cartSlice.actions;

export default cartSlice.reducer;
