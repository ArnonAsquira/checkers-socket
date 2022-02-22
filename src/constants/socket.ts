const socketApiBaseUrl = "http://localhost:8081";

const incomingSocketEvents = {
  playerDisconnected: "player disconnected",
  newGameObject: "new game object",
  indicators: "indicators",
  joinedGame: "joined game",
  winner: "winner",
  loser: "loser",
  updateTime: "update time",
  err: "err",
};

const outGoingSocketEvents = {
  joinGame: "join game",
  selectPiece: "select piece",
  takeTurn: "take turn",
};

export { socketApiBaseUrl, incomingSocketEvents, outGoingSocketEvents };
