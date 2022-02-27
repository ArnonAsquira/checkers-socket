import { IMessageObj } from "../../types/socketTypes";
import mainStore from "../../redux/mainStore";
import { addMessage, addUnseenMessage } from "../../redux/slices/chatSlice";

const handleNewMessage = (messageObj: IMessageObj) => {
  const chatIsOpen = mainStore.getState().chat.chatIsOpen;
  if (!chatIsOpen) {
    mainStore.dispatch(addUnseenMessage());
  }
  mainStore.dispatch(addMessage(messageObj));
};

export { handleNewMessage };
