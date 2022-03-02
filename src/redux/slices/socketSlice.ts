import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

interface ISocketSlice {
  gameToken: string | null;
  ioConnection: Socket<DefaultEventsMap, DefaultEventsMap> | null;
  joinedGame: boolean;
  userId: string | null;
}

const initialState: ISocketSlice = {
  gameToken: null,
  ioConnection: null,
  joinedGame: false,
  userId: null,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setGameToken: (state, action: PayloadAction<string>) => ({
      ...state,
      gameToken: action.payload,
    }),
    removeGameToken: (state) => {
      state.gameToken = null;
    },
    setIoConnection: (
      state,
      action: PayloadAction<Socket<DefaultEventsMap, DefaultEventsMap>>
    ) => ({ ...state, ioConnection: action.payload }),
    joinedGame: (state, action) => ({ ...state, joinedGame: true }),
    leftGame: (state, action) => ({ ...state, joinedGame: false }),
    setUserId: (state, action: PayloadAction<string>) => ({
      ...state,
      userId: action.payload,
    }),
  },
});

export const {
  setIoConnection,
  setGameToken,
  joinedGame,
  leftGame,
  setUserId,
  removeGameToken,
} = socketSlice.actions;
export default socketSlice.reducer;
