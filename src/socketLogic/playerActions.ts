import mainStore from "../redux/mainStore";
import { IndicatorInfo, IPieceInfoObject } from "../types/boardTypes";

const selectPiece = (piece: IPieceInfoObject) => {
  const gameId = mainStore.getState().socket.gameToken;
  const socket = mainStore.getState().socket.ioConnection;
  if (socket === null) {
    return;
  }
  socket.emit("select piece", piece, gameId);
};

const takeTurn = (indicator: IndicatorInfo) => {
  const gameId = mainStore.getState().socket.gameToken;
  const socket = mainStore.getState().socket.ioConnection;
  if (socket === null) {
    return console.log("no socket connection");
  }
  socket.emit("take turn", indicator, gameId);
};

export { selectPiece, takeTurn };
