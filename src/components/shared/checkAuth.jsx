import { Navigate, useLocation } from "react-router";

/**
 * Check Authorization component
 * @description This component checks if the user is authenticated and if they have the correct role to access the page. If not, it redirects the user to the login/register page.
 */
const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();

  if (location.pathname === "/") {
    if (!isAuthenticated) return <Navigate to="/auth/login" replace />;
    else {
      if (user?.role === "admin") {
        return <Navigate to="/admin/dashboard" replace />;
      } else {
        return <Navigate to="/shopping/home" replace />;
      }
    }
  }

  if (!isAuthenticated) {
    // Redirect unauthenticated users trying to access restricted pages
    if (
      !location.pathname.includes("/login") &&
      !location.pathname.includes("/register")
    ) {
      return <Navigate to="/auth/login" replace />;
    }
  }

  // Redirect authenticated users away from login/register if already logged in
  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    return user?.role === "admin" ? (
      <Navigate to="/admin/dashboard" replace />
    ) : (
      <Navigate to="/shopping/home" replace />
    );
  }

  // Redirect non-admin users trying to access admin routes
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("/admin")
  ) {
    return <Navigate to="/unAuth" replace />;
  }

  // Redirect admin users away from shopping routes
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("/shopping")
  ) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // If none of the conditions are met, render the children components (authorized access)
  return children;
};

export default CheckAuth;
