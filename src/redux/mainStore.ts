import { configureStore } from "@reduxjs/toolkit";
import socketReducer from "./slices/socketSlice";
import onlineCheckersBoardReducer from "./slices/onlineCheckersSlice";
import histortyReducer from "./slices/historySlice";

const mainStore = configureStore({
  reducer: {
    socket: socketReducer,
    onlineCheckersBoard: onlineCheckersBoardReducer,
    history: histortyReducer,
  },
});

type MainStore = ReturnType<typeof mainStore.getState>;

export type { MainStore };
export default mainStore;
