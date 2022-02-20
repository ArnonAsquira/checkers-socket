import BoardSqaure from "./BoardSquare";
import {
  IndicatorInfo,
  Location,
  IBoardPositions,
  IPieceInfoObject,
  ITurn,
  PlatyerColors,
} from "../../types/boardTypes";
import { Fragment, useEffect, useState } from "react";
import arrayEqual, { arrayIncludes } from "../utils/arrayEqual";
import {
  initailPlayersLocations,
  amountOfRows,
  quardinatnts,
} from "../utils/boardBuild";
import { indicatorLocations, oppositeColor } from "../utils/boardUtils";
import { adjacentPieces } from "../utils/mandatoryMoves";
import { colorOne, colorTwo } from "../../constants/board";
import { useSelector, useStore } from "react-redux";
import { MainStore } from "../../redux/mainStore";
import {
  selectPiece,
  takeTurn as takeTurnSocket,
} from "../../socketLogic/playerActions";
import socketSlice from "../../redux/slices/socketSlice";

const OnlineBoard = () => {
  const gamaSlice = useSelector(
    (state: MainStore) => state.onlineCheckersBoard
  );
  const userColor = gamaSlice.usersColor;
  const postions = gamaSlice.gamePositions;
  const currentTurn = gamaSlice.currentTurn;
  const indicators = gamaSlice.indicators;
  const players = gamaSlice.players;
  const selectedPiece = gamaSlice.selectedPiece;

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
      <h1>
        current turn: {currentTurn} player one: {players.playerOne} player two:
        {players.playerTwo}
      </h1>
      <div id="board">{rows.map((row) => row)}</div>
    </Fragment>
  );
};

export default OnlineBoard;
