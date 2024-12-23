import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import adminReducer from "./adminSlice";
import reviewReducer from "./reviewSlice";
import featureReducer from "./featureSlice";
import addressReducer from "./addressSlice";
import shoppingCartReducer from "./cartSlice";
import shoppingOrderReducer from "./orderSlice";
import shoppingProductsReducer from "./shopSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    review: reviewReducer,
    address: addressReducer,
    features: featureReducer,
    shoppingCart: shoppingCartReducer,
    shoppingOrder: shoppingOrderReducer,
    shoppingProducts: shoppingProductsReducer,
  },
});

export default store;
