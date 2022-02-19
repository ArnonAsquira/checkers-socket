import { configureStore } from "@reduxjs/toolkit";
import socketReducer from "./slices/socketSlice";
import onlineCheckersBoardReducer from "./slices/onlineCheckersSlice";

const mainStore = configureStore({
  reducer: {
    socket: socketReducer,
    onlineCheckersBoard: onlineCheckersBoardReducer,
  },
});

type MainStore = ReturnType<typeof mainStore.getState>;

export type { MainStore };
export default mainStore;
