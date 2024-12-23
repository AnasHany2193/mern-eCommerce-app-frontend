import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const initialState = {
  isLoading: false,
  productList: [],
  error: null,
  ordersList: [],
  orderDetails: null,
};

/**
 * Create new product
 * @description Sends a request to create a new product by sending the product data to the API endpoint.
 */
export const addNewProduct = createAsyncThunk(
  "products/addProduct",
  async (formData) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/admin/products/add`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return response?.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error creating product"
      );
    }
  }
);

/**
 * Edit product
 * @description Sends a request to edit a product by sending the product ID and data to the API endpoint.
 */
export const editProduct = createAsyncThunk(
  "products/editProduct",
  async ({ id, formData }) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/admin/products/edit/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return response?.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error editing product");
    }
  }
);

/**
 * Delete product
 * @description Sends a request to delete a product by sending the product ID to the API endpoint.
 */
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    try {
      const response = await axios.delete(
        `${API_URL}/api/admin/products/delete/${id}`,
        {
          withCredentials: true,
        }
      );

      return response?.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error deleting product"
      );
    }
  }
);

/**
 * Get all products
 * @description Sends a request to get all products.
 */
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/products/get`, {
        withCredentials: true,
      });

      return response?.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error fetching products"
      );
    }
  }
);

export const getOrders = createAsyncThunk("orders/getOrders", async () => {
  try {
    const response = await axios.get(`${API_URL}/api/admin/orders/get`, {
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
        `${API_URL}/api/admin/orders/getOrderDetails/${orderId}`,
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

export const updateOrderStatus = createAsyncThunk(
  "/orders/updateStatus",
  async ({ orderId, orderStatus }) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/admin/orders/updateStatus/${orderId}`,
        { orderStatus },
        {
          withCredentials: true,
        }
      );

      return response?.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update order status"
      );
    }
  }
);

const AdminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Products
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload?.data || [];
        state.error = null;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
        state.error = action.payload || "Failed to fetch products";
      })

      // Add Product
      .addCase(addNewProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addNewProduct.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addNewProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to add product";
      })

      // Edit Product
      .addCase(editProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editProduct.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to edit product";
      })

      // Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to delete product";
      })

      // Get Orders
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ordersList = action.payload?.data || [];
        state.error = null;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.ordersList = [];
        state.error = action.payload || "Failed to fetch orders";
      })

      // Get Order Details
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
      })

      // Get Order Details
      .addCase(updateOrderStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(updateOrderStatus.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export const { resetOrderDetails } = AdminSlice.actions;
export default AdminSlice.reducer;
