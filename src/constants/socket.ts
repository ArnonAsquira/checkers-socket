import * as config from "../utils/environmentVars";

const socketApiBaseUrl = config.socketApiBaseUrl;

const incomingSocketEvents = {
  playerDisconnected: "player disconnected",
  newGameObject: "new game object",
  indicators: "indicators",
  joinedGame: "joined game",
  winner: "winner",
  loser: "loser",
  updateTime: "update time",
  err: "err",
  message: "message",
};

const outGoingSocketEvents = {
  joinGame: "join game",
  selectPiece: "select piece",
  takeTurn: "take turn",
  message: "message",
};

export { socketApiBaseUrl, incomingSocketEvents, outGoingSocketEvents };
