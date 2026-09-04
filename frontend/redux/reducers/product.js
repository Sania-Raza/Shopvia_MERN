import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  allProducts: [],
  products: [],
  product: null,
  error: null,
  success: false,
};

export const productReducer = createReducer(initialState, (builder) => {
  builder

    // =========================
    // CREATE PRODUCT
    // =========================

    .addCase("productCreateRequest", (state) => {
      state.isLoading = true;
    })

    .addCase("productCreateSuccess", (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
      state.success = true;
    })

    .addCase("productCreateFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })

    // =========================
    // GET ALL PRODUCTS OF SHOP
    // =========================

    .addCase("getAllProductsShopRequest", (state) => {
      state.isLoading = true;
    })

    .addCase("getAllProductsShopSuccess", (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    })

    .addCase("getAllProductsShopFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // =========================
    // DELETE PRODUCT
    // =========================

    .addCase("deleteProductRequest", (state) => {
      state.isLoading = true;
    })

    .addCase("deleteProductSuccess", (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    })

    .addCase("deleteProductFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // =========================
    // GET ALL PRODUCTS
    // =========================

    .addCase("getAllProductsRequest", (state) => {
      state.isLoading = true;
    })

    .addCase("getAllProductsSuccess", (state, action) => {
      state.isLoading = false;
      state.allProducts = action.payload;
    })

    .addCase("getAllProductsFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // GET SINGLE PRODUCT
    // =========================

    .addCase("getProductByIdRequest", (state) => {
      state.isLoading = true;
      state.error = null;
    })

    .addCase("getProductByIdSuccess", (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
    })

    .addCase("getProductByIdFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // =========================
    // CLEAR ERRORS
    // =========================

    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});

