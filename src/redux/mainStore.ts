import { configureStore } from "@reduxjs/toolkit";
import socketReducer from "./slices/socketSlice";
import onlineCheckersBoardReducer from "./slices/onlineCheckersSlice";
import histortyReducer from "./slices/historySlice";
import chatSlice from "./slices/chatSlice";

const mainStore = configureStore({
  reducer: {
    socket: socketReducer,
    onlineCheckersBoard: onlineCheckersBoardReducer,
    history: histortyReducer,
    chat: chatSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

type MainStore = ReturnType<typeof mainStore.getState>;

export type { MainStore };
export default mainStore;
