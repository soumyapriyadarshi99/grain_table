import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const grainSlice = createSlice({
  name: "grains",
  initialState,
  reducers: {
    addGrain: () => {},
    removeGrain: () => {},
    editGrain: () => {},
  },
});

// Action creators are generated for each case reducer function
export const { addGrain, removeGrain, editGrain } = grainSlice.actions;

export default grainSlice.reducer;
