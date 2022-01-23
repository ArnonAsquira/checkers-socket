import {
  Location,
  IDiagonalSquares,
  IndicatorInfo,
  IBoardPositions,
} from "../../types/boardTypes";
import arrayEqual from "./arrayEqual";

const threatendPieces = (
  indicatorLocationsProp: [Location, Location],
  postions: IBoardPositions,
  turn: "red" | "blue"
): Location[] => {
  return postions[turn === "red" ? "blue" : "red"].filter(
    (position) =>
      arrayEqual(position, indicatorLocationsProp[0]) ||
      arrayEqual(position, indicatorLocationsProp[1])
  );
};

const diagonalSquares = (location: Location): IDiagonalSquares => {
  return {
    rightDown: [location[0] + 1, location[1] + 1],
    rightUp: [location[0] - 1, location[1] + 1],
    leftDown: [location[0] + 1, location[1] - 1],
    leftUp: [location[0] - 1, location[1] - 1],
  };
};

const indicatorLocations = (
  pieceLocationProp: Location | null,
  postions: IBoardPositions,
  turn: "red" | "blue",
  first: boolean
): IndicatorInfo[] => {
  if (pieceLocationProp === null) return [];

  const locations: [IndicatorInfo, IndicatorInfo] =
    postions["red"].filter((position) =>
      arrayEqual(position, pieceLocationProp)
    ).length !== 1
      ? [
          {
            location: diagonalSquares(pieceLocationProp).leftUp,
            endangers: null,
          },
          {
            location: diagonalSquares(pieceLocationProp).rightUp,
            endangers: null,
          },
        ]
      : [
          {
            location: diagonalSquares(pieceLocationProp).leftDown,
            endangers: null,
          },
          {
            location: diagonalSquares(pieceLocationProp).rightDown,
            endangers: null,
          },
        ];

  const threatLocations = threatendPieces(
    [locations[0].location, locations[1].location],
    postions,
    turn
  );
  if (threatLocations.length > 0) {
    threatLocations.forEach((pieceLocation) => {
      const newLocation: Location =
        turn === "red"
          ? pieceLocationProp[1] - 1 === pieceLocation[1]
            ? diagonalSquares(pieceLocation).leftDown
            : diagonalSquares(pieceLocation).rightDown
          : pieceLocationProp[1] - 1 === pieceLocation[1]
          ? diagonalSquares(pieceLocation).leftUp
          : diagonalSquares(pieceLocation).rightUp;

      locations.splice(
        locations.findIndex((info) => arrayEqual(info.location, pieceLocation)),
        1,
        { location: newLocation, endangers: pieceLocation }
      );
    });
  }
  return locations
    .filter(
      (info) =>
        !(
          postions["red"].filter((position) =>
            arrayEqual(info.location, position)
          ).length > 0 ||
          postions["blue"].filter((position) =>
            arrayEqual(info.location, position)
          ).length > 0
        )
    )
    .filter((info) =>
      first
        ? true
        : (Math.sign(info.location[0] - pieceLocationProp[0]) === -1
            ? -1 * (info.location[0] - pieceLocationProp[0])
            : info.location[0] - pieceLocationProp[0]) > 1
    );
};

export default indicatorLocations;
