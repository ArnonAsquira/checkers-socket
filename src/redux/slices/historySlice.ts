import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createBrowserHistory, BrowserHistory } from "history";

const history = createBrowserHistory();

interface IHistorySlice {
  history: BrowserHistory;
}

const initialState: IHistorySlice = {
  history,
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    pushToHistory: (state, action: PayloadAction<string>) => {
      state.history.push(action.payload);
    },
  },
});

export const { pushToHistory } = historySlice.actions;

export default historySlice.reducer;
