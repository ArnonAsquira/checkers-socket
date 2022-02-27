import { outGoingSocketEvents } from "../constants/socket";
import mainStore from "../redux/mainStore";
import { IndicatorInfo, IPieceInfoObject } from "../types/boardTypes";

const selectPiece = (piece: IPieceInfoObject) => {
  const gameId = mainStore.getState().socket.gameToken;
  const socket = mainStore.getState().socket.ioConnection;
  const userId = mainStore.getState().socket.userId;
  if (socket === null) {
    return alert("socket connection lost");
  }
  socket.emit(outGoingSocketEvents.selectPiece, piece, gameId, userId);
};

const takeTurn = (indicator: IndicatorInfo) => {
  const gameId = mainStore.getState().socket.gameToken;
  const socketConnection = mainStore.getState().socket.ioConnection;
  const userId = mainStore.getState().socket.userId;
  if (socketConnection === null) {
    return console.log("no socket connection");
  }
  socketConnection.emit(
    outGoingSocketEvents.takeTurn,
    indicator,
    gameId,
    userId
  );
};

const sendMessage = (message: string, gameToken: string) => {
  const socketConnection = mainStore.getState().socket.ioConnection;
  if (socketConnection === null) {
    return console.log("no socket connection");
  }
  socketConnection.emit(outGoingSocketEvents.message, message, gameToken);
};

export { selectPiece, takeTurn, sendMessage };
