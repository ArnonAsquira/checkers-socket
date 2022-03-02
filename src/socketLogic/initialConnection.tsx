import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { authAxiosConfig } from "../constants/axios";
import {
  incomingSocketEvents,
  outGoingSocketEvents,
  socketApiBaseUrl,
} from "../constants/socket";
import mainStore from "../redux/mainStore";
import {
  addPlayer,
  removePlayer,
  setGamePositions,
  setIndicators,
  setLogo,
  setSelectedPiece,
  setTimers,
  setTurn,
} from "../redux/slices/onlineCheckersSlice";
import { setGameToken, setIoConnection } from "../redux/slices/socketSlice";
import { IndicatorInfo, IPieceInfoObject } from "../types/boardTypes";
import {
  IGameInfo,
  IMessageObj,
  IPlayerTimers,
  LogoTypes,
} from "../types/socketTypes";
import { handleNewMessage } from "./utils/chat";
import { removeAlert, setAlert } from "../redux/slices/customAlertsSlice";
import AlertDialog from "../componentes/customAlert/AlertDialog";
import Swal from "sweetalert2";

const makeSocketConnection = (url: string) => {
  const socket = io(url, {
    auth: { token: authAxiosConfig().headers.authorization },
  });
  mainStore.dispatch(setIoConnection(socket));
  return socket;
};

const joinSocketGame = (gameId: string, userId: string) => {
  mainStore.dispatch(setGameToken(gameId));
  const socket = makeSocketConnection(socketApiBaseUrl);
  socket.emit(outGoingSocketEvents.joinGame, gameId, userId);
  handleSocketLogic(socket);
};

const handleSocketLogic = (
  socket: Socket<DefaultEventsMap, DefaultEventsMap>
) => {
  socket.on(
    incomingSocketEvents.joinedGame,
    (userId: string, time: number, logo: LogoTypes) => {
      if (typeof userId !== "string") {
        return;
      }
      mainStore.dispatch(addPlayer(userId));
      mainStore.dispatch(
        setTimers({
          ...mainStore.getState().onlineCheckersBoard.timers,
          playerTwo: time,
        })
      );
      mainStore.dispatch(setLogo({ player: 2, logo }));
    }
  );
  socket.on(
    incomingSocketEvents.indicators,
    (indicators: IndicatorInfo[], selectedPiece: IPieceInfoObject) => {
      mainStore.dispatch(setIndicators(indicators));
      mainStore.dispatch(setSelectedPiece(selectedPiece));
    }
  );
  socket.on(incomingSocketEvents.newGameObject, (gameInfo: IGameInfo) => {
    mainStore.dispatch(setGamePositions(gameInfo.positions));
    mainStore.dispatch(setIndicators(gameInfo.indicators));
    mainStore.dispatch(setSelectedPiece(gameInfo.selcetedPiece));
    mainStore.dispatch(setTurn(gameInfo.turn));
  });

  socket.on(incomingSocketEvents.playerDisconnected, (playerNum) => {
    Swal.fire("player disconnected you have won the game");
    mainStore.dispatch(removePlayer(playerNum));
  });

  socket.on(incomingSocketEvents.winner, (playerNum) => {
    Swal.fire("you have won the game");
    mainStore.dispatch(removePlayer(playerNum));
  });

  socket.on(incomingSocketEvents.loser, (playerNum) => {
    Swal.fire("you have lost the game");
    mainStore.dispatch(removePlayer(playerNum));
  });

  socket.on(incomingSocketEvents.updateTime, (timersData: IPlayerTimers) => {
    mainStore.dispatch(setTimers(timersData));
  });

  socket.on(incomingSocketEvents.message, (messageObj: IMessageObj) => {
    handleNewMessage(messageObj);
  });

  socket.on(incomingSocketEvents.err, (err: any) => {
    if (typeof err === "string") {
      if (err === "game does not exist") {
        return;
      }
      Swal.fire(err);
    }
  });
};

export { makeSocketConnection, joinSocketGame };
