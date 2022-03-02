import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BackgroundTypes, ICostumizationData } from "../../types/socketTypes";

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
  },
});

export const { setBackground } = environemntCostumizationSlice.actions;
export default environemntCostumizationSlice.reducer;
