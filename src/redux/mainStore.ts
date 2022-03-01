import { configureStore } from "@reduxjs/toolkit";
import socketReducer from "./slices/socketSlice";
import onlineCheckersBoardReducer from "./slices/onlineCheckersSlice";
import histortyReducer from "./slices/historySlice";
import chatSlice from "./slices/chatSlice";
import customAlertsSlice from "./slices/customAlertsSlice";
import cutstomizationSlice from "./slices/environmentCustomizationSlice";

const mainStore = configureStore({
  reducer: {
    socket: socketReducer,
    onlineCheckersBoard: onlineCheckersBoardReducer,
    history: histortyReducer,
    chat: chatSlice,
    alerts: customAlertsSlice,
    customization: cutstomizationSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

type MainStore = ReturnType<typeof mainStore.getState>;

export type { MainStore };
export default mainStore;
