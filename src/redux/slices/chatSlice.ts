import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMessageObj } from "../../types/socketTypes";

interface IChetSliceState {
  messages: IMessageObj[];
  unseenMessagesCount: number;
  chatIsOpen: boolean;
}

const initialState: IChetSliceState = {
  messages: [],
  unseenMessagesCount: 0,
  chatIsOpen: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<IMessageObj>) => {
      state.messages.push(action.payload);
    },
    addUnseenMessage: (state) => {
      state.unseenMessagesCount++;
    },
    setChatIsOpen: (state, action: PayloadAction<boolean>) => {
      if (!action.payload) {
        state.unseenMessagesCount = 0;
      }
      state.chatIsOpen = action.payload;
    },
    resetChat: () => initialState,
  },
});

export const { addMessage, resetChat, setChatIsOpen, addUnseenMessage } =
  chatSlice.actions;
export default chatSlice.reducer;
