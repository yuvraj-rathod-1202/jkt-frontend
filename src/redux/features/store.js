import { configureStore } from "@reduxjs/toolkit";
import itemsApi from "./items/itemsApi";
import brandsApi from "./brands/brandApi";
import categoriesApi from "./categories/categoriesApi";
import stocksApi from "./Stocks/stocksApi";
import customersApi from "./customers/customerApi";

export const store = configureStore({
    reducer: {
        [itemsApi.reducerPath]: itemsApi.reducer,
        [brandsApi.reducerPath]: brandsApi.reducer,
        [categoriesApi.reducerPath]: categoriesApi.reducer,
        [stocksApi.reducerPath]: stocksApi.reducer,
        [customersApi.reducerPath]: customersApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(itemsApi.middleware)
            .concat(brandsApi.middleware)
            .concat(categoriesApi.middleware)
            .concat(stocksApi.middleware)
            .concat(customersApi.middleware)
});
