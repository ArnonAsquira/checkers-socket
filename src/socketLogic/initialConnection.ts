import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { socketApiBaseUrl } from "../constants/socket";
import mainStore from "../redux/mainStore";
import {
  addPlayer,
  removePlayer,
  setGamePositions,
  setIndicators,
  setSelectedPiece,
  setTurn,
} from "../redux/slices/onlineCheckersSlice";
import { setGameToken, setIoConnection } from "../redux/slices/socketSlice";
import { IndicatorInfo, IPieceInfoObject } from "../types/boardTypes";
import { IGameInfo } from "../types/socketTypes";
import { createBrowserHistory } from "history";
import { pushToHistory } from "../redux/slices/historySlice";
import player from "../componentes/Player";

let history = createBrowserHistory();

const makeSocketConnection = (url: string) => {
  const socket = io(url);
  mainStore.dispatch(setIoConnection(socket));
  return socket;
};

const joinSocketGame = (gameId: string, userId: string) => {
  mainStore.dispatch(setGameToken(gameId));
  const socket = makeSocketConnection(socketApiBaseUrl);
  socket.emit("join game", gameId, userId);
  handleSocketLogic(socket);
};

const handleSocketLogic = (
  socket: Socket<DefaultEventsMap, DefaultEventsMap>
) => {
  socket.on("joined game", (userId: string) => {
    if (typeof userId !== "string") {
      return;
    }
    mainStore.dispatch(addPlayer(userId));
  });
  socket.on(
    "indicators",
    (indicators: IndicatorInfo[], selectedPiece: IPieceInfoObject) => {
      mainStore.dispatch(setIndicators(indicators));
      mainStore.dispatch(setSelectedPiece(selectedPiece));
    }
  );
  socket.on("new game object", (gameInfo: IGameInfo) => {
    console.log(gameInfo);
    mainStore.dispatch(setGamePositions(gameInfo.positions));
    mainStore.dispatch(setIndicators(gameInfo.indicators));
    mainStore.dispatch(setSelectedPiece(gameInfo.selcetedPiece));
    mainStore.dispatch(setTurn(gameInfo.turn));
  });

  socket.on("player disconnected", (playerNum) => {
    console.log(playerNum);
    alert("the other player has disconnected you have won the game");
    mainStore.dispatch(removePlayer(playerNum));
  });
};

export { makeSocketConnection, joinSocketGame };
