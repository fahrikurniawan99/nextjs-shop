import { configureStore } from "@reduxjs/toolkit";
import search from "@/features/search/searchSlice";

const store = configureStore({
  reducer: {
    search,
  },
});

export default store;
