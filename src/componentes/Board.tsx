import BoardSqaure from "./BoardSquare";
import { IndicatorInfo, Location } from "../types/boardTypes";
import { useState } from "react";
import arrayEqual from "./utils/arrayEqual";
import {
  initailPlayersLocations,
  amountOfRows,
  quardinatnts,
} from "./utils/boardBuild";
import indicatorLocations from "./utils/boardUtils";

const Board = () => {
  const [turn, setTurn] = useState<"red" | "blue">("red");
  const [turnCounter, setTurnCounter] = useState<number>(0);
  const [postions, setPosition] = useState<{
    red: Location[];
    blue: Location[];
  }>(initailPlayersLocations);
  const [selectedPiece, setSelectedPiece] = useState<Location | null>(null);

  const currentIndicatorLocations = indicatorLocations(
    selectedPiece,
    postions,
    turn,
    turnCounter === 0
  );

  if (currentIndicatorLocations.length < 1 && turnCounter > 0) {
    setTurn((turn) => (turn === "red" ? "blue" : "red"));
    setTurnCounter(0);
  }

  const takeTurn = (newLocation: Location) => {
    if (selectedPiece === null) return alert("please select a piece");
    if (
      postions[turn].filter((position) => arrayEqual(position, selectedPiece))
        .length !== 1
    )
      return alert(`it's ${turn}'s turn`);
    const indicatorInfo: IndicatorInfo | undefined =
      currentIndicatorLocations.find((info) =>
        arrayEqual(info.location, newLocation)
      );
    const oppositeColor = turn === "red" ? "blue" : "red";

    setPosition((positions) => ({
      ...positions,
      [turn]: postions[turn]
        .filter((playerLocation) => !arrayEqual(playerLocation, selectedPiece))
        .concat([newLocation]),
      [oppositeColor]:
        indicatorInfo && indicatorInfo.endangers !== null
          ? postions[oppositeColor].filter(
              (playerLocation) =>
                !arrayEqual(indicatorInfo.endangers as Location, playerLocation)
            )
          : postions[oppositeColor],
    }));
    const consecutiveDanger = indicatorLocations(
      newLocation,
      postions,
      turn,
      turnCounter === 0
    ).filter((info) => info.endangers);
    if (
      consecutiveDanger.length < 1 ||
      (Math.sign(newLocation[0] - selectedPiece[0]) === -1
        ? -1 * (newLocation[0] - selectedPiece[0])
        : newLocation[0] - selectedPiece[0]) < 2
    ) {
      setTurnCounter(0);
      setTurn((player) => (player === "red" ? "blue" : "red"));
    } else {
      setTurnCounter((counter) => counter + 1);
    }
    setSelectedPiece(newLocation);
  };

  const rows = [];
  for (let i = 0; i < quardinatnts.length; i += amountOfRows) {
    rows.push(
      <div>
        {quardinatnts.slice(i, i + amountOfRows).map((location) => (
          <BoardSqaure
            location={location}
            color={(location[0] + location[1]) % 2 === 0 ? "light" : "dark"}
            player={
              postions.red.includes(location)
                ? "red"
                : postions.blue.includes(location)
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
          />
        ))}
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
