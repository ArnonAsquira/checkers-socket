import { io } from "socket.io-client";

const makeSocketConnection = (url: string) => {
  const socket = io(url);
  return socket;
};

export { makeSocketConnection };
