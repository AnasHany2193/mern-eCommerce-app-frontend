import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router";

import { checkAuth } from "./store/authSlice";

import Loader from "./components/shared/Loader";
import AuthLayout from "./components/auth/layout";
import AdminLayout from "./components/admin/layout";
import CheckAuth from "./components/shared/checkAuth";
import ShoppingLayout from "./components/shopping/layout";

import UnAuth from "./pages/unAuth";

import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";

import AdminProducts from "./pages/admin/products";
import AdminOrdersPage from "./pages/admin/orders";
import AdminDashboard from "./pages/admin/dashboard";

import ShoppingHome from "./pages/shopping/home";
import ShoppingListing from "./pages/shopping/listing";
import ShoppingAccount from "./pages/shopping/account";
import ShoppingCheckout from "./pages/shopping/checkout";
import ShoppingSearch from "./pages/shopping/search";

function AppRoutes() {
  const { user, isLoading, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return isLoading ? (
    <Loader />
  ) : (
    <Routes>
      <Route
        path="/"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}></CheckAuth>
        }
      />

      <Route
        path="/"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}></CheckAuth>
        }
      />

      <Route
        path="/auth"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        }
      >
        <Route index element={<Navigate to="login" replace />} />
        <Route path="login" index element={<AuthLogin />} />
        <Route path="register" element={<AuthRegister />} />
      </Route>

      <Route
        path="/admin"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="orders" element={<AdminOrdersPage />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="dashboard" element={<AdminDashboard />} />
      </Route>

      <Route
        path="/shopping"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout />
          </CheckAuth>
        }
      >
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<ShoppingHome />} />
        <Route path="listing" element={<ShoppingListing />} />
        <Route path="account" element={<ShoppingAccount />} />
        <Route path="checkout" element={<ShoppingCheckout />} />
        <Route path="search" element={<ShoppingSearch />} />
      </Route>
      <Route path="/unAuth" element={<UnAuth />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
