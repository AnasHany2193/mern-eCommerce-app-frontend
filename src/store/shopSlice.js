import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const initialState = {
  isLoading: true,
  productList: [],
  productDetails: null,
  searchResult: [],
};

export const getFilteredProducts = createAsyncThunk(
  "products/getFilteredProducts",
  async ({ filters, sortBy }) => {
    try {
      const queryString = new URLSearchParams({
        ...filters,
        sortBy,
      });

      // Fetch products
      const response = await axios.get(
        `${API_URL}/api/shop/products/get?${queryString}`
      );

      return response?.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error on get products");
    }
  }
);

export const getProductDetails = createAsyncThunk(
  "products/getProductDetails",
  async (id) => {
    try {
      // Fetch products
      const response = await axios.get(
        `${API_URL}/api/shop/products/get/${id}`
      );

      return response?.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error on get product details"
      );
    }
  }
);

export const getSearchProducts = createAsyncThunk(
  "products/search",
  async (keyword) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/shop/products/search/${keyword}`
      );
      return response?.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error on search products"
      );
    }
  }
);

const shoppingProductsSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {
    setProductDetails: (state) => {
      state.productDetails = null;
    },
    resetSearchResult: (state) => {
      state.searchResult = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFilteredProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(getFilteredProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      })
      .addCase(getProductDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload.data;
      })
      .addCase(getProductDetails.rejected, (state) => {
        state.isLoading = false;
        state.productDetails = null;
      })
      .addCase(getSearchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSearchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResult = action.payload.data;
      })
      .addCase(getSearchProducts.rejected, (state) => {
        state.isLoading = false;
        state.searchResult = [];
      });
  },
});

export const { setProductDetails, resetSearchResult } =
  shoppingProductsSlice.actions;
export default shoppingProductsSlice.reducer;
