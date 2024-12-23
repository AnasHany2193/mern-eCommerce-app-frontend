import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import { createRoot } from "react-dom/client";

import "./index.css";

import store from "./store/store";
import AppRoutes from "./AppRoutes.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <AppRoutes />
      <Toaster visibleToasts={2} position="top-center" richColors />
    </Provider>
  </BrowserRouter>
);
