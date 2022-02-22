import BoardSqaure from "./BoardSquare";
import {
  IndicatorInfo,
  Location,
  IBoardPositions,
  IPieceInfoObject,
  ITurn,
  PlatyerColors,
} from "../types/boardTypes";
import { useEffect, useState } from "react";
import arrayEqual, { arrayIncludes } from "./utils/arrayEqual";
import {
  initailPlayersLocations,
  amountOfRows,
  quardinatnts,
} from "./utils/boardBuild";
import { indicatorLocations, oppositeColor } from "./utils/boardUtils";
import { adjacentPieces } from "./utils/mandatoryMoves";
import { colorOne, colorTwo } from "../constants/board";

const Board = () => {
  const [turn, setTurn] = useState<PlatyerColors>(colorOne);
  const [turnCounter, setTurnCounter] = useState<number>(0);
  const [postions, setPosition] = useState<IBoardPositions>({
    red: initailPlayersLocations.red.map((location) => ({
      location,
      isQueen: false,
    })),
    blue: initailPlayersLocations.blue.map((location) => ({
      location,
      isQueen: false,
    })),
  });
  const [selectedPiece, setSelectedPiece] = useState<IPieceInfoObject | null>(
    null
  );
  const [lastTurn, setLastTurn] = useState<ITurn>({
    color: "red",
    from: { location: [-1, -1], isQueen: false },
    to: { location: [-1, -1], isQueen: false },
  });
  const [mandatoryMoves, setMandatoryMoves] = useState<IndicatorInfo[]>([]);
  const [movesPlayed, setMovesPlayed] = useState<Location[]>([]);

  const currentIndicatorLocations =
    mandatoryMoves.length > 0
      ? mandatoryMoves
      : indicatorLocations(selectedPiece, postions, turn, turnCounter === 0);

  useEffect(() => {
    if (mandatoryMoves.length > 0) return;
    const newMandatoryMoves = adjacentPieces(postions, turn);
    if (newMandatoryMoves !== null) {
      setMandatoryMoves(newMandatoryMoves);
    }
  }, [turn]);

  useEffect(() => {
    setMovesPlayed((moves) =>
      moves.concat([lastTurn.from.location]).concat([lastTurn.to.location])
    );
    console.log(movesPlayed);
  }, [lastTurn]);

  const isValidPiece = (
    pieceInfo: IPieceInfoObject,
    positions: IBoardPositions,
    turn: "red" | "blue",
    first: boolean,
    mandatoryMoves: IndicatorInfo[]
  ): boolean => {
    let isValid = false;
    if (mandatoryMoves.length < 0) return true;
    const pieceIndicators = indicatorLocations(
      pieceInfo,
      positions,
      turn,
      first
    );
    for (const indicator of pieceIndicators) {
      for (const move of mandatoryMoves) {
        if (arrayEqual(move.location, indicator.location)) {
          isValid = true;
        }
      }
    }
    return isValid;
  };

  const takeTurn = (newLocation: Location) => {
    if (selectedPiece === null) return alert("please select a piece");
    if (
      postions[turn].filter((position) =>
        arrayEqual(position.location, selectedPiece.location)
      ).length !== 1
    )
      return alert(`it's ${turn}'s turn`);

    const indicatorInfo: IndicatorInfo | undefined =
      currentIndicatorLocations.find((info) =>
        arrayEqual(info.location, newLocation)
      );

    if (indicatorInfo === undefined) return alert("something went wrong");

    const reachedEndOfBoard =
      turn === colorOne ? newLocation[0] === 7 : newLocation[0] === 0;

    setPosition((positions) => ({
      ...positions,
      [turn]: postions[turn]
        .filter(
          (playerInfo) =>
            !arrayEqual(playerInfo.location, selectedPiece.location)
        )
        .concat(
          reachedEndOfBoard
            ? [{ location: newLocation, isQueen: true }]
            : [{ location: newLocation, isQueen: selectedPiece.isQueen }]
        ),
      [oppositeColor(turn)]:
        indicatorInfo && indicatorInfo.endangers !== null
          ? postions[oppositeColor(turn)].filter(
              (playerInfo) =>
                !arrayEqual(
                  indicatorInfo.endangers as Location,
                  playerInfo.location
                )
            )
          : postions[oppositeColor(turn)],
    }));

    // checking for another possible consecutive turn
    const consecutiveDanger = indicatorLocations(
      {
        location: newLocation,
        isQueen: selectedPiece.isQueen || reachedEndOfBoard,
      },
      postions,
      turn,
      turnCounter === 0
    ).filter((info) => info.endangers);
    if (
      consecutiveDanger.length < 1 ||
      !(indicatorInfo && indicatorInfo.endangers)
    ) {
      setTurnCounter(0);
      setTurn((player) => (player === "red" ? "blue" : "red"));
      setSelectedPiece(null);
      setMandatoryMoves([]);
    } else {
      setTurnCounter((counter) => counter + 1);
      setSelectedPiece({
        location: newLocation,
        isQueen: selectedPiece.isQueen || reachedEndOfBoard,
      });
      setMandatoryMoves(consecutiveDanger);
    }
    setLastTurn({
      color: turn,
      from: selectedPiece,
      to: {
        location: newLocation,
        isQueen: selectedPiece.isQueen || reachedEndOfBoard,
      },
    });
  };

  const rows = [];
  for (let i = 0; i < quardinatnts.length; i += amountOfRows) {
    rows.push(
      <div>
        {quardinatnts.slice(i, i + amountOfRows).map((location) => {
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
                  : currentIndicatorLocations
                      .map((indicatorLocation) =>
                        arrayEqual(indicatorLocation.location, location)
                      )
                      .includes(true)
                  ? "indicator"
                  : undefined
              }
              setSelectedPiece={turnCounter === 0 ? setSelectedPiece : null}
              isSelectedPiece={
                selectedPiece === null
                  ? false
                  : arrayEqual(selectedPiece.location, location)
              }
              takeTurn={takeTurn}
              isQueen={
                arrayIncludes(
                  location,
                  postions.red
                    .filter((info) => info.isQueen)
                    .map((info) => info.location)
                ) ||
                arrayIncludes(
                  location,
                  postions.blue
                    .filter((info) => info.isQueen)
                    .map((info) => info.location)
                )
              }
            />
          );
        })}
      </div>
    );
  }

  return <div id="board">{rows.map((row) => row)}</div>;
};

export default Board;
