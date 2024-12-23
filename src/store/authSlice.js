import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

/**
 * Register user
 * @description This function will register a new user with the API server. It will return a promise with the response.
 */
export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/auth/register`,
        formData,
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Registration went wrong"
      );
    }
  }
);

/**
 * Login user
 * @description This function will login a user with the API server. It will return a promise with the response.
 */
export const loginUser = createAsyncThunk("auth/login", async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, formData, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Logging in went wrong");
  }
});

/**
 * Logout user
 * @description This function will logout a user with the API server. It will return a promise with the response.
 */
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  try {
    const response = await axios.get(`${API_URL}/api/auth/logout`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Logging in went wrong");
  }
});

/**
 * Check if user is authenticated
 * @description This function will check if a user is authenticated. It will return a promise with the response.
 */
export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
  try {
    const response = await axios.get(`${API_URL}/api/auth/checkAuth`, {
      withCredentials: true,
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Checking authentication went wrong"
    );
  }
});

/**
 * Authentication reducer
 * @description This reducer will handle the authentication state. It will return the initial state and the action. It will also handle the async actions.
 */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
