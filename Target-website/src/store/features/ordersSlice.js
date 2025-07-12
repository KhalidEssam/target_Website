import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    orders: [],
    status: 'idle',
    error: null,
    selectedOrder: null,
};

export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        addOrder: (state, action) => {
            const exists = state.orders.some(order => order._id === action.payload._id);
            if (!exists) {
              state.orders.push(action.payload);
            }
          },          
        addAllOrders: (state, action) => {
            state.orders = action.payload;
          },          
        updateOrder: (state, action) => {
            const { _id, ...updates } = action.payload;
            const orderIndex = state.orders.findIndex(order => order._id === _id);
            if (orderIndex !== -1) {
                state.orders[orderIndex] = { ...state.orders[orderIndex], ...updates };
            }
        },
        deleteOrder: (state, action) => {
            state.orders = state.orders.filter(order => order._id !== action.payload);
        },
        selectOrder: (state, action) => {
            state.selectedOrder = action.payload;
        },
        clearSelectedOrder: (state) => {
            state.selectedOrder = null;
        },
    },
    extraReducers: (builder) => {
        // Add any async thunks here if needed
    },
});

export const { 
    addOrder, 
    addAllOrders,
    updateOrder, 
    deleteOrder, 
    selectOrder, 
    clearSelectedOrder 
} = ordersSlice.actions;

export default ordersSlice.reducer;

// Selectors
export const selectOrders = (state) => state.orders.orders;
export const selectOrderById = (state, orderId) => 
    state.orders.orders.find(order => order._id === orderId);
export const selectSelectedOrder = (state) => state.orders.selectedOrder;
export const selectOrderStatus = (state) => state.orders.status;
export const selectOrderError = (state) => state.orders.error;
