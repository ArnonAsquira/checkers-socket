import BoardSqaure from "./BoardSquare";
import { Location } from "../types/boardTypes";
import { useState } from "react";
import arrayEqual from "./utils/arrayEqual";

const amountOfRows = 8;

const quardinatnts: Location[] = [];

for (let i = 0; i < amountOfRows; i++) {
  for (let j = 0; j < amountOfRows; j++) {
    quardinatnts.push([i, j]);
  }
}

const darkTiles: Location[] = quardinatnts.filter(
  (location) => (location[0] + location[1]) % 2 !== 0
);

const initailPlayersLocations: { red: Location[]; blue: Location[] } = {
  red: darkTiles.slice(0, 12),
  blue: darkTiles.slice(20, 32),
};

const Board = () => {
  const [turn, setTurn] = useState<"red" | "blue">("red");
  const [postions, setPosition] = useState<{
    red: Location[];
    blue: Location[];
  }>(initailPlayersLocations);
  const [selectedPiece, setSelectedPiece] = useState<Location | null>(null);

  const indicatorLocations = ((): Location[] => {
    if (selectedPiece === null) return [];

    return postions["red"].filter((position) =>
      arrayEqual(position, selectedPiece)
    ).length !== 1
      ? [
          [selectedPiece[0] - 1, selectedPiece[1] + 1],
          [selectedPiece[0] - 1, selectedPiece[1] - 1],
        ]
      : [
          [selectedPiece[0] + 1, selectedPiece[1] + 1],
          [selectedPiece[0] + 1, selectedPiece[1] - 1],
        ];
  })();

  console.log(indicatorLocations);

  const takeTurn = (newLocation: Location) => {
    if (selectedPiece === null) return alert("please select a piece");
    if (
      postions[turn].filter((position) => arrayEqual(position, selectedPiece))
        .length !== 1
    )
      return alert(`it's ${turn}'s turn`);
    console.log(
      postions[turn]
        .filter((playerLocation) => !arrayEqual(playerLocation, selectedPiece))
        .concat([newLocation])
    );
    setPosition((positions) => ({
      ...positions,
      [turn]: postions[turn]
        .filter((playerLocation) => !arrayEqual(playerLocation, selectedPiece))
        .concat([newLocation]),
    }));
    setTurn((player) => (player === "red" ? "blue" : "red"));
    setSelectedPiece(null);
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
                : indicatorLocations
                    .map((indicatorLocation) =>
                      arrayEqual(indicatorLocation, location)
                    )
                    .includes(true)
                ? "indicator"
                : undefined
            }
            setPosition={setPosition}
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

  return <div id="board">{rows.map((row) => row)}</div>;
};

export default Board;
