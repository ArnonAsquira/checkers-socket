import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
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
  setSelectedPiece,
  setTimers,
  setTurn,
} from "../redux/slices/onlineCheckersSlice";
import { setGameToken, setIoConnection } from "../redux/slices/socketSlice";
import { IndicatorInfo, IPieceInfoObject } from "../types/boardTypes";
import { IGameInfo, IPlayerTimers } from "../types/socketTypes";

const makeSocketConnection = (url: string) => {
  const socket = io(url);
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
  socket.on(incomingSocketEvents.joinedGame, (userId: string, time: number) => {
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
  });
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
    alert("the other player has disconnected you have won the game");
    mainStore.dispatch(removePlayer(playerNum));
  });

  socket.on(incomingSocketEvents.winner, (playerNum) => {
    alert(`you have won the game`);
    mainStore.dispatch(removePlayer(playerNum));
  });

  socket.on(incomingSocketEvents.loser, (playerNum) => {
    alert("you have lost the game");
    mainStore.dispatch(removePlayer(playerNum));
  });

  socket.on(incomingSocketEvents.updateTime, (timersData: IPlayerTimers) => {
    mainStore.dispatch(setTimers(timersData));
  });

  socket.on(incomingSocketEvents.err, (err: any) => {
    console.log({ err });
    if (typeof err === "string") {
      if (err === "game does not exist") {
        return;
      }
      return alert(err);
    }
  });
};

export { makeSocketConnection, joinSocketGame };
