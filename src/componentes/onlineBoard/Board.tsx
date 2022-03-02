import BoardSqaure from "./BoardSquare";
import {
  IndicatorInfo,
  Location,
  IPieceInfoObject,
} from "../../types/boardTypes";
import { Fragment } from "react";
import arrayEqual, { arrayIncludes } from "../utils/arrayEqual";
import { amountOfRows, quardinatnts } from "../utils/boardBuild";
import { useSelector } from "react-redux";
import mainStore, { MainStore } from "../../redux/mainStore";
import {
  selectPiece,
  takeTurn as takeTurnSocket,
} from "../../socketLogic/playerActions";
import axios from "axios";
import { socketApiBaseUrl } from "../../constants/socket";
import { authAxiosConfig } from "../../constants/axios";
import { useNavigate } from "react-router-dom";
import GameInfo from "./GameInfo";
import { cleanGame } from "../../redux/slices/onlineCheckersSlice";
import ChatDialog from "./chat/ChatDialog";
import { resetChat } from "../../redux/slices/chatSlice";
import { gameOptionsPath } from "../../login_src/constants/appPaths";
import Swal from "sweetalert2";
import { removeGameToken } from "../../redux/slices/socketSlice";
import InvitePlayerDialog from "./InvitePlayerDialog";

const OnlineBoard = () => {
  const socketSlice = useSelector((state: MainStore) => state.socket);
  const gamaSlice = useSelector(
    (state: MainStore) => state.onlineCheckersBoard
  );
  const userColor = gamaSlice.usersColor;
  const postions = gamaSlice.gamePositions;
  const currentTurn = gamaSlice.currentTurn;
  const indicators = gamaSlice.indicators;
  const players = gamaSlice.players;
  const selectedPiece = gamaSlice.selectedPiece;
  const timers = gamaSlice.timers;

  const navigate = useNavigate();

  if (postions === null || socketSlice.gameToken === null) {
    return null;
  }

  const isYourTurn = (): boolean => {
    return currentTurn === userColor;
  };

  const takeTurn = (indicator: IndicatorInfo) => {
    if (!isYourTurn()) {
      return Swal.fire({ icon: "error", text: "this is not your turn " });
    }
    takeTurnSocket(indicator);
  };

  const setSelectedPiece = (piece: IPieceInfoObject) => {
    if (!isYourTurn()) {
      Swal.fire({ icon: "error", text: "this is not your turn" });
      return null;
    }
    selectPiece(piece);
  };

  const handleQuitGame = async () => {
    try {
      if (players.playerOne === null || players.playerTwo == null) {
        mainStore.dispatch(cleanGame(1));
        navigate(gameOptionsPath);
        return await axios.post(
          `${socketApiBaseUrl}/game/logout`,
          {
            userId: socketSlice.userId,
            gameToken: socketSlice.gameToken,
          },
          authAxiosConfig()
        );
      }
      // const playerIsSure = window.confirm(
      //   "are you sure you want to quit and lose the game"
      // );
      const playerIsSure = true;
      if (!playerIsSure) return;
      await axios.post(
        `${socketApiBaseUrl}/game/logout`,
        {
          userId: socketSlice.userId,
          gameToken: socketSlice.gameToken,
        },
        authAxiosConfig()
      );
      mainStore.dispatch(cleanGame(1));
      mainStore.dispatch(removeGameToken());
      navigate(gameOptionsPath);
      mainStore.dispatch(resetChat());
    } catch (err: any) {
      const parsedErr = err && err.response && err.response.data;
      if (parsedErr !== "game does not exist") {
        return Swal.fire({ icon: "error", text: parsedErr });
      }
    }
  };

  const rows = [];
  for (let i = 0; i < quardinatnts.length; i += amountOfRows) {
    rows.push(
      <div>
        {quardinatnts.slice(i, i + amountOfRows).map((location: Location) => {
          return (
            <BoardSqaure
              location={location}
              color={(location[0] + location[1]) % 2 === 0 ? "light" : "dark"}
              player={
                arrayIncludes(
                  location,
                  postions.red.map((info) => info.location)
                )
                  ? "red"
                  : arrayIncludes(
                      location,
                      postions.blue.map((info) => info.location)
                    )
                  ? "blue"
                  : indicators
                      .map((indicatorInfo) =>
                        arrayEqual(indicatorInfo.location, location)
                      )
                      .includes(true)
                  ? "indicator"
                  : undefined
              }
              setSelectedPiece={setSelectedPiece}
              isQueen={
                arrayIncludes(
                  location,
                  postions.blue
                    .filter((info) => info.isQueen)
                    .map((info) => info.location)
                ) ||
                arrayIncludes(
                  location,
                  postions.red
                    .filter((info) => info.isQueen)
                    .map((info) => info.location)
                )
              }
              isSelectedPiece={
                selectedPiece !== null &&
                arrayEqual(location, selectedPiece.location)
              }
              takeTurn={(e) => {
                const indicator = indicators.find((indicator) =>
                  arrayEqual(indicator.location, e)
                );
                if (!indicator) {
                  return Swal.fire({ icon: "error", text: "no indicators" });
                }
                takeTurn(indicator);
              }}
            />
          );
        })}
      </div>
    );
  }

  return (
    <Fragment>
      <div className="log-out-of-game">
        <button onClick={handleQuitGame}>quit game</button>
        <ChatDialog gameId={socketSlice.gameToken} />
      </div>
      <GameInfo timers={timers} players={players} currentTurn={currentTurn} />
      <InvitePlayerDialog />
      <div id="board">{rows.map((row) => row)}</div>
    </Fragment>
  );
};

export default OnlineBoard;
