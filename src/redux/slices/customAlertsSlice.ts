import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReactElement } from "react";

interface IAlertsSliceState {
  alert: ReactElement | null;
}

const initialState: IAlertsSliceState = {
  alert: null,
};

const alertsSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<ReactElement>) => {
      state.alert = action.payload;
      console.log(state.alert);
    },
    removeAlert: (state) => {
      state.alert = null;
    },
  },
});

export const { setAlert, removeAlert } = alertsSlice.actions;
export default alertsSlice.reducer;
