import { Fragment, useRef, FC } from "react";
import { useSelector } from "react-redux";
import mainStore, { MainStore } from "../../../redux/mainStore";
import { setChatIsOpen } from "../../../redux/slices/chatSlice";
import { sendMessage } from "../../../socketLogic/playerActions";

interface IChatDialogProps {
  gameId: string;
}

const ChatDialog: FC<IChatDialogProps> = ({ gameId }) => {
  const chatSlice = useSelector((state: MainStore) => state.chat);
  const gameSlice = useSelector(
    (state: MainStore) => state.onlineCheckersBoard
  );
  const messageRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = () => {
    if (!messageRef.current) {
      return;
    }
    const message = messageRef.current.value;
    sendMessage(message, gameId);
  };

  const handleOpen = () => {
    mainStore.dispatch(setChatIsOpen(true));
  };

  const handleClose = () => {
    mainStore.dispatch(setChatIsOpen(false));
  };
  return (
    <Fragment>
      <img
        onClick={handleOpen}
        src="https://s2.svgbox.net/hero-outline.svg?ic=chat&color=000000"
        width="32"
        height="32"
        alt=""
        className="open-chat"
      />
      <div className="unseen-messages-counter">
        {chatSlice.unseenMessagesCount}
      </div>
      <dialog
        className="chat-dialog"
        open={chatSlice.chatIsOpen}
        style={{ zIndex: 100 }}
      >
        <div className="messages-area">
          {chatSlice.messages.map((message, i) => (
            <div
              key={i}
              className="message"
              style={{
                backgroundColor:
                  gameSlice.players.playerOne === message.userName
                    ? "red"
                    : "blue",
              }}
            >
              <span className="sender">{message.userName}</span>:{" "}
              <span className="content">{message.content}</span>
            </div>
          ))}
        </div>
        <div>
          <input type="text" ref={messageRef} />
          <button className="send-message-button" onClick={handleSendMessage}>
            send message
          </button>
          <img
            className="close-chat-button"
            src="https://s2.svgbox.net/hero-outline.svg?ic=x&color=000000"
            width="32"
            height="32"
            alt="exit chat"
            onClick={handleClose}
          ></img>
        </div>
      </dialog>
    </Fragment>
  );
};

export default ChatDialog;
