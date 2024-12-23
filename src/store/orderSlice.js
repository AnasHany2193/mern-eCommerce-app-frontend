import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const initialState = {
  isLoading: false,
  sessionUrl: null,
  orderId: null,
  orderList: [],
  orderDetails: null,
};

export const createCheckoutSession = createAsyncThunk(
  "/checkout/createCheckoutSession",
  async ({ items, address, totalAmount, cartId }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/shop/order/checkout/add`,
        {
          cartItems: items,
          address,
          totalAmount,
          cartId,
        },
        { withCredentials: true }
      );

      return response?.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to create checkout session"
      );
    }
  }
);

export const getUserOrders = createAsyncThunk("/order/getOrders", async () => {
  try {
    const response = await axios.get(`${API_URL}/api/shop/order/getOrders`, {
      withCredentials: true,
    });

    return response?.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to get orders");
  }
});

export const getOrdersDetails = createAsyncThunk(
  "/order/getOrderDetails",
  async (orderId) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/shop/order/getOrderDetails/${orderId}`,
        { withCredentials: true }
      );

      return response?.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get order details"
      );
    }
  }
);

const orderSlice = createSlice({
  name: "shoppingOrder",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCheckoutSession.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCheckoutSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sessionUrl = action.payload.url;
        state.orderId = action.payload.orderId;
      })
      .addCase(createCheckoutSession.rejected, (state) => {
        state.isLoading = false;
        state.sessionUrl = null;
        state.orderId = null;
      })
      .addCase(getUserOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getUserOrders.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrdersDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrdersDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrdersDetails.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});
export const { resetOrderDetails } = orderSlice.actions;
export default orderSlice.reducer;
