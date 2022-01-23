import BoardSqaure from "./BoardSquare";
import { IndicatorInfo, Location } from "../types/boardTypes";
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

  const threatendPieces = (
    indicatorLocationsProp: [Location, Location]
  ): Location[] => {
    return postions[turn === "red" ? "blue" : "red"].filter(
      (position) =>
        arrayEqual(position, indicatorLocationsProp[0]) ||
        arrayEqual(position, indicatorLocationsProp[1])
    );
  };

  const indicatorLocations = ((): IndicatorInfo[] => {
    if (selectedPiece === null) return [];

    const locations: [IndicatorInfo, IndicatorInfo] =
      postions["red"].filter((position) => arrayEqual(position, selectedPiece))
        .length !== 1
        ? [
            {
              location: [selectedPiece[0] - 1, selectedPiece[1] + 1],
              endangers: null,
            },
            {
              location: [selectedPiece[0] - 1, selectedPiece[1] - 1],
              endangers: null,
            },
          ]
        : [
            {
              location: [selectedPiece[0] + 1, selectedPiece[1] + 1],
              endangers: null,
            },
            {
              location: [selectedPiece[0] + 1, selectedPiece[1] - 1],
              endangers: null,
            },
          ];

    const threatLocations = threatendPieces([
      locations[0].location,
      locations[1].location,
    ]);
    if (threatLocations.length > 0) {
      threatLocations.forEach((pieceLocation) => {
        const newLocation: Location =
          turn === "red"
            ? selectedPiece[1] - 1 === pieceLocation[1]
              ? [pieceLocation[0] + 1, pieceLocation[1] - 1]
              : [pieceLocation[0] + 1, pieceLocation[1] + 1]
            : selectedPiece[1] - 1 === pieceLocation[1]
            ? [pieceLocation[0] - 1, pieceLocation[1] - 1]
            : [pieceLocation[0] - 1, pieceLocation[1] + 1];

        locations.splice(
          locations.findIndex((info) =>
            arrayEqual(info.location, pieceLocation)
          ),
          1,
          { location: newLocation, endangers: pieceLocation }
        );
      });
      console.log(locations);
    }
    return locations;
  })();

  const takeTurn = (newLocation: Location) => {
    if (selectedPiece === null) return alert("please select a piece");
    if (
      postions[turn].filter((position) => arrayEqual(position, selectedPiece))
        .length !== 1
    )
      return alert(`it's ${turn}'s turn`);
    const indicatorInfo: IndicatorInfo | undefined = indicatorLocations.find(
      (info) => arrayEqual(info.location, newLocation)
    );

    if (indicatorInfo && indicatorInfo.endangers) {
      console.log(indicatorInfo.endangers);
    }
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
