import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  event: null,
  events: [],
  allEvents: [],
  error: null,
  success: false,
  message: null,
};

export const eventReducer = createReducer(initialState, (builder) => {
  builder

    // =========================
    // CREATE EVENT
    // =========================

    .addCase("eventCreateRequest", (state) => {
      state.isLoading = true;
      state.error = null;
    })

    .addCase("eventCreateSuccess", (state, action) => {
      state.isLoading = false;
      state.event = action.payload;
      state.success = true;
      state.error = null;
    })

    .addCase("eventCreateFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })

    // =========================
    // GET ALL EVENTS OF SHOP
    // =========================

    .addCase("getAlleventsShopRequest", (state) => {
      state.isLoading = true;
      state.error = null;
    })

    .addCase("getAlleventsShopSuccess", (state, action) => {
      state.isLoading = false;
      state.events = action.payload;
      state.error = null;
    })

    .addCase("getAlleventsShopFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // =========================
    // DELETE EVENT
    // =========================

    .addCase("deleteeventRequest", (state) => {
      state.isLoading = true;
      state.error = null;
    })

    .addCase("deleteeventSuccess", (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = null;
    })

    .addCase("deleteeventFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // =========================
    // GET ALL EVENTS
    // =========================

    .addCase("getAlleventsRequest", (state) => {
      state.isLoading = true;
      state.error = null;
    })

    .addCase("getAlleventsSuccess", (state, action) => {
      state.isLoading = false;
      state.allEvents = action.payload;
      state.error = null;
    })

    .addCase("getAlleventsFailed", (state, action) => {
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
