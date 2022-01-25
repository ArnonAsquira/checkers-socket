import BoardSqaure from "./BoardSquare";
import { IndicatorInfo, Location, IBoardPositions } from "../types/boardTypes";
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
  const [postions, setPosition] = useState<IBoardPositions>(
    initailPlayersLocations
  );
  const [selectedPiece, setSelectedPiece] = useState<Location | null>(null);
  const [queenPositions, setQueenPostions] = useState<IBoardPositions>({
    red: [],
    blue: [],
  });

  const oppositeColor = turn === "red" ? "blue" : "red";

  const currentIndicatorLocations = indicatorLocations(
    selectedPiece,
    postions,
    queenPositions,
    turn,
    turnCounter === 0,
    selectedPiece === null
      ? false
      : arrayIncludes(selectedPiece, queenPositions[turn])
  );

  console.log(currentIndicatorLocations);

  if (currentIndicatorLocations.length < 1 && turnCounter > 0) {
    setTurn((turn) => (turn === "red" ? "blue" : "red"));
    setTurnCounter(0);
  }

  const takeTurn = (newLocation: Location) => {
    let isQueen = false;
    if (selectedPiece === null) return alert("please select a piece");
    if (
      queenPositions[turn].filter((position) =>
        arrayEqual(position, selectedPiece)
      ).length !== 0
    ) {
      isQueen = true;
    }
    if (
      postions[turn].filter((position) => arrayEqual(position, selectedPiece))
        .length !== 1 &&
      !isQueen
    )
      return alert(`it's ${turn}'s turn`);

    const indicatorInfo: IndicatorInfo | undefined =
      currentIndicatorLocations.find((info) =>
        arrayEqual(info.location, newLocation)
      );
    const reachedEndOfBoard =
      turn === "red" ? newLocation[0] === 7 : newLocation[0] === 0;

    setPosition((positions) => ({
      ...positions,
      [turn]: isQueen
        ? positions[turn]
        : postions[turn]
            .filter(
              (playerLocation) => !arrayEqual(playerLocation, selectedPiece)
            )
            .concat(reachedEndOfBoard ? [] : [newLocation]),
      [oppositeColor]:
        indicatorInfo && indicatorInfo.endangers !== null
          ? postions[oppositeColor].filter(
              (playerLocation) =>
                !arrayEqual(indicatorInfo.endangers as Location, playerLocation)
            )
          : postions[oppositeColor],
    }));

    setQueenPostions((positions) => ({
      ...positions,
      [oppositeColor]:
        indicatorInfo && indicatorInfo.endangers !== null
          ? positions[oppositeColor].filter(
              (playerLocation) =>
                !arrayEqual(indicatorInfo.endangers as Location, playerLocation)
            )
          : positions[oppositeColor],
      [turn]: isQueen
        ? positions[turn]
            .filter((location) => !arrayEqual(location, selectedPiece))
            .concat([newLocation])
        : positions[turn],
    }));

    if (reachedEndOfBoard && !isQueen) {
      setQueenPostions((positions) => ({
        ...positions,
        [turn]: positions[turn].concat([newLocation]),
      }));
    }

    // checking for another possible consecutive turn
    const consecutiveDanger = indicatorLocations(
      newLocation,
      postions,
      queenPositions,
      turn,
      turnCounter === 0,
      isQueen
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
      setSelectedPiece(newLocation);
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
                postions.red.includes(location) ||
                arrayIncludes(location, queenPositions.red)
                  ? "red"
                  : postions.blue.includes(location) ||
                    arrayIncludes(location, queenPositions.blue)
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
                  : arrayEqual(selectedPiece, location)
              }
              takeTurn={takeTurn}
              isQueen={
                arrayIncludes(location, queenPositions.red) ||
                arrayIncludes(location, queenPositions.blue)
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
