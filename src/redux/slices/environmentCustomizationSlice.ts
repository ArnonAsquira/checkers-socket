import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  BackgroundTypes,
  ICostumizationData,
  LogoTypes,
} from "../../types/socketTypes";

const initialState: ICostumizationData = {
  background: "dark",
  logo: null,
};

const environemntCostumizationSlice = createSlice({
  name: "costumization",
  initialState,
  reducers: {
    setBackground: (state, action: PayloadAction<BackgroundTypes>) => {
      state.background = action.payload;
    },
    setLogo: (state, action: PayloadAction<LogoTypes>) => {
      state.logo = action.payload;
    },
  },
});

export const { setBackground, setLogo } = environemntCostumizationSlice.actions;
export default environemntCostumizationSlice.reducer;
