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
import { MainStore } from "../../redux/mainStore";
import {
  selectPiece,
  takeTurn as takeTurnSocket,
} from "../../socketLogic/playerActions";
import axios from "axios";
import { socketApiBaseUrl } from "../../constants/socket";
import socketSlice from "../../redux/slices/socketSlice";
import { authAxiosConfig } from "../../constants/axios";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  if (postions === null) {
    return null;
  }

  const isYourTurn = (): boolean => {
    return currentTurn === userColor;
  };

  const takeTurn = (indicator: IndicatorInfo) => {
    if (!isYourTurn()) {
      return alert("this is not your turn");
    }
    takeTurnSocket(indicator);
  };

  const setSelectedPiece = (piece: IPieceInfoObject) => {
    if (!isYourTurn()) {
      return alert("this is not your turn");
    }
    selectPiece(piece);
  };

  const handleQuitGame = async () => {
    try {
      if (players.playerOne === null || players.playerTwo == null) {
        navigate("/gameOptions");
        return await axios.post(
          `${socketApiBaseUrl}/game/logout`,
          {
            userId: socketSlice.userId,
            gameToken: socketSlice.gameToken,
          },
          authAxiosConfig()
        );
      }
      const playerIsSure = window.confirm(
        "are you sure you want to quit and lose the game"
      );
      if (!playerIsSure) return;
      const { data } = await axios.post(
        `${socketApiBaseUrl}/game/logout`,
        {
          userId: socketSlice.userId,
          gameToken: socketSlice.gameToken,
        },
        authAxiosConfig()
      );
      console.log(data);
      navigate("/gameoptions");
    } catch (err: any) {
      alert(err && err.response && err.response.data);
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
              isQueen={false}
              isSelectedPiece={
                selectedPiece !== null &&
                arrayEqual(location, selectedPiece.location)
              }
              takeTurn={(e) => {
                const indicator = indicators.find((indicator) =>
                  arrayEqual(indicator.location, e)
                );
                if (!indicator) {
                  return alert("indicator not found");
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
      </div>
      <div className="game-info">
        <div className="current-turn">
          current turn:
          <span style={currentTurn !== null ? { color: currentTurn } : {}}>
            {currentTurn}
          </span>
        </div>
        <div className="player">
          <span className="one">player one:</span> {players.playerOne}
        </div>
        <div className="player">
          <span className="two">player two:</span>
          {players.playerTwo}
        </div>
      </div>
      <div id="board">{rows.map((row) => row)}</div>
    </Fragment>
  );
};

export default OnlineBoard;
