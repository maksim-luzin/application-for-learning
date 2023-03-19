import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import { update } from "./reducer";

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    update,
  },
});

const commonReducer = commonSlice.reducer;
const commonActions = commonSlice.actions;

type TCommonActions = typeof commonActions;

export { initialState, commonReducer, commonActions };

export type { TCommonActions };
