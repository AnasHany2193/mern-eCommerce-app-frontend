import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const initialState = {
  addressList: [],
  isLoading: true,
};

export const addAddress = createAsyncThunk(
  "/account/addAddress",
  async ({ address, city, pinCode, phone, note }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/account/address/add`,
        {
          address,
          city,
          pinCode,
          phone,
          note,
        },
        { withCredentials: true }
      );

      return response?.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error on add address");
    }
  }
);

export const fetchAddress = createAsyncThunk(
  "/account/fetchAddress",
  async () => {
    try {
      const response = await axios.get(`${API_URL}/api/account/address/get`, {
        withCredentials: true,
      });

      return response?.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error on fetch address"
      );
    }
  }
);

export const updateAddress = createAsyncThunk(
  "/account/editAddress",
  async ({ addressId, address, city, pinCode, phone, note }) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/account/address/edit/${addressId}`,
        { address, city, pinCode, phone, note },
        { withCredentials: true }
      );

      return response?.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error on add to cart");
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "/account/deleteAddress",
  async (addressId) => {
    try {
      const response = await axios.delete(
        `${API_URL}/api/account/address/delete/${addressId}`,
        { withCredentials: true }
      );

      return response?.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error on delete address"
      );
    }
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAddress.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addAddress.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(fetchAddress.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      })
      .addCase(updateAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(updateAddress.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      })
      .addCase(deleteAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(deleteAddress.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      });
  },
});

export default addressSlice.reducer;
