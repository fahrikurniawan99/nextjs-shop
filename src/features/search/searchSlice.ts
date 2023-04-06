import { createSlice } from "@reduxjs/toolkit";

const initialState: { query: string } = {
  query: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
});

export default searchSlice.reducer
