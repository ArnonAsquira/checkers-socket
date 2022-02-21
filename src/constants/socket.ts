const socketApiBaseUrl = "http://localhost:8081";

const incomingSocketEvents = {
  playerDisconnected: "player disconnected",
  newGameObject: "new game object",
  indicators: "indicators",
  joinedGame: "joined game",
};

const outGoingSocketEvents = {
  joinGame: "join game",
  selectPiece: "select piece",
  takeTurn: "take turn",
};

export { socketApiBaseUrl, incomingSocketEvents, outGoingSocketEvents };
