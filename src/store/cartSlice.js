import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const initialState = {
  cartItems: [],
  isLoading: true,
};

export const addToCart = createAsyncThunk(
  "/cart/addToCart",
  async ({ userId, productId, quantity }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/shop/cart/add`,
        {
          userId,
          productId,
          quantity,
        },
        { withCredentials: true }
      );

      return response?.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error on add to cart");
    }
  }
);

export const fetchCartItem = createAsyncThunk(
  "/cart/fetchCartItem",
  async () => {
    try {
      const response = await axios.get(`${API_URL}/api/shop/cart/get`, {
        withCredentials: true,
      });

      return response?.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error on fetch cart items"
      );
    }
  }
);

export const updateCartQuantity = createAsyncThunk(
  "/cart/updateCartQuantity",
  async ({ productId, quantity }) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/shop/cart/update-cart`,
        {
          productId,
          quantity,
        },
        { withCredentials: true }
      );

      return response?.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error on update product quantity"
      );
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  "/cart/deleteCartItem",
  async (productId) => {
    try {
      const response = await axios.delete(
        `${API_URL}/api/shop/cart/delete/${productId}`,
        { withCredentials: true }
      );

      return response?.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error on delete from cart"
      );
    }
  }
);

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(addToCart.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(fetchCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(fetchCartItem.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(updateCartQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(updateCartQuantity.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(deleteCartItem.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      });
  },
});

export default shoppingCartSlice.reducer;
