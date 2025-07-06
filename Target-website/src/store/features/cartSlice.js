import { createSlice } from '@reduxjs/toolkit';

const loadCartFromLocalStorage = () => {
  try {
    const saved = JSON.parse(localStorage.getItem('cartItems')) || [];
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
};

const savedItems = loadCartFromLocalStorage();

const initialState = {
  items: savedItems,
  total: savedItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2),
  cartOpen: false, // NEW: track if drawer is open

};


export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const incomingItem = action.payload;
      const existingItem = state.items.find(item => item._id === incomingItem._id);
    
      if (existingItem) {
        existingItem.quantity += 1; // Add 1 by default
      } else {
        // ❗ Force quantity to 1, do NOT use `incomingItem.quantity`
        state.items.push({ ...incomingItem, quantity: 1 });
      }
    
      // Recalculate total
      state.total = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item._id !== action.payload);
      state.total = Number(
        state.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
      );
    },

    updateQuantity: (state, action) => {
      const { itemId, quantity } = action.payload;
      const item = state.items.find(item => item._id === itemId);

      if (item) {
        if (quantity < 1) {
          state.items = state.items.filter(item => item._id !== itemId);
        } else {
          item.quantity = quantity;
        }
        state.total = Number(
          state.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
        );
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
    toggleCartDrawer: (state) => {
      state.cartOpen = !state.cartOpen;
    },
    setCartDrawerOpen: (state, action) => {
      state.cartOpen = action.payload;
    },
    
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, toggleCartDrawer, setCartDrawerOpen } = cartSlice.actions;

// ➕ Selector for total quantity (optional for UI)
export const getTotalQuantity = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

export default cartSlice.reducer;
