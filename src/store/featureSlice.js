import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const initialState = {
  isLoading: false,
  featureList: [],
};

export const addImage = createAsyncThunk("feature/addImage", async (image) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/feature/image/add`,
      { image },
      {
        withCredentials: true,
      }
    );
    return response?.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error upload image");
  }
});

export const getImage = createAsyncThunk("feature/addImage", async () => {
  try {
    const response = await axios.get(`${API_URL}/api/feature/image/get`, {
      withCredentials: true,
    });
    return response?.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error get image");
  }
});

const featureSlice = createSlice({
  name: "features",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureList = action.payload.data;
      })
      .addCase(getImage.rejected, (state) => {
        state.isLoading = false;
        state.featureList = [];
      });
  },
});

export default featureSlice.reducer;
