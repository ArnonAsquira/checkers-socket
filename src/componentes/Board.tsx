import BoardSqaure from "./BoardSquare";
import {
  IndicatorInfo,
  Location,
  IBoardPositions,
  IPieceInfoObject,
} from "../types/boardTypes";
import { useState } from "react";
import arrayEqual, { arrayIncludes } from "./utils/arrayEqual";
import {
  initailPlayersLocations,
  amountOfRows,
  quardinatnts,
} from "./utils/boardBuild";
import { indicatorLocations } from "./utils/boardUtils";

const Board = () => {
  const [turn, setTurn] = useState<"red" | "blue">("red");
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

  const oppositeColor = turn === "red" ? "blue" : "red";

  const currentIndicatorLocations = indicatorLocations(
    selectedPiece,
    postions,
    turn,
    turnCounter === 0
  );

  console.log(currentIndicatorLocations);

  if (currentIndicatorLocations.length < 1 && turnCounter > 0) {
    setTurn((turn) => (turn === "red" ? "blue" : "red"));
    setTurnCounter(0);
  }

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
      turn === "red" ? newLocation[0] === 7 : newLocation[0] === 0;

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
      [oppositeColor]:
        indicatorInfo && indicatorInfo.endangers !== null
          ? postions[oppositeColor].filter(
              (playerInfo) =>
                !arrayEqual(
                  indicatorInfo.endangers as Location,
                  playerInfo.location
                )
            )
          : postions[oppositeColor],
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
    } else {
      setTurnCounter((counter) => counter + 1);
      setSelectedPiece({
        location: newLocation,
        isQueen: selectedPiece.isQueen || reachedEndOfBoard,
      });
    }
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
              setSelectedPiece={setSelectedPiece}
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

  return (
    <div id="board">
      {`${turn}'s turn`}
      {rows.map((row) => row)}
    </div>
  );
};

export default Board;
