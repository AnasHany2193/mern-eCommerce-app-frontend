import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const initialState = {
  isLoading: true,
  reviews: [],
};

export const addNewReview = createAsyncThunk("review/add", async (data) => {
  try {
    const response = await axios.post(`${API_URL}/api/shop/review/add`, data, {
      withCredentials: true,
    });
    return response?.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error adding review");
  }
});

export const getReviews = createAsyncThunk("review/get", async (id) => {
  try {
    if (!id) {
      throw new Error("Invalid id");
    }

    const response = await axios.get(`${API_URL}/api/shop/review/get/${id}`, {
      withCredentials: true,
    });

    return response?.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error adding review");
  }
});

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    resetReviews: (state) => {
      state.reviews = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload?.data || [];
      })
      .addCase(getReviews.rejected, (state) => {
        state.isLoading = false;
        state.reviews = [];
      });
  },
});

export const { resetReviews } = reviewSlice.actions;
export default reviewSlice.reducer;
