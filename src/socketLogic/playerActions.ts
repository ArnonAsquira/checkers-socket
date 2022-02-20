import mainStore from "../redux/mainStore";
import { IndicatorInfo, IPieceInfoObject } from "../types/boardTypes";

const selectPiece = (piece: IPieceInfoObject) => {
  const gameId = mainStore.getState().socket.gameToken;
  const socket = mainStore.getState().socket.ioConnection;
  const userId = mainStore.getState().socket.userId;
  if (socket === null) {
    return alert("socket connection lost");
  }
  socket.emit("select piece", piece, gameId, userId);
};

const takeTurn = (indicator: IndicatorInfo) => {
  const gameId = mainStore.getState().socket.gameToken;
  const socketConnection = mainStore.getState().socket.ioConnection;
  const userId = mainStore.getState().socket.userId;
  if (socketConnection === null) {
    return console.log("no socket connection");
  }
  socketConnection.emit("take turn", indicator, gameId, userId);
};

export { selectPiece, takeTurn };
