import { info } from "console";
import {
  Location,
  IDiagonalSquares,
  IndicatorInfo,
  IBoardPositions,
} from "../../types/boardTypes";
import arrayEqual, { arrayIncludes } from "./arrayEqual";

const threatendPieces = (
  indicatorLocationsProp: Location[],
  postions: IBoardPositions,
  turn: "red" | "blue"
): Location[] => {
  return postions[turn === "red" ? "blue" : "red"].filter((position) =>
    arrayIncludes(position, indicatorLocationsProp)
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

const imiddeateMoves = (
  postions: IBoardPositions,
  pieceLocation: Location
): [IndicatorInfo, IndicatorInfo] => {
  const locations: [IndicatorInfo, IndicatorInfo] =
    postions["red"].filter((position) => arrayEqual(position, pieceLocation))
      .length !== 1
      ? [
          {
            location: diagonalSquares(pieceLocation).leftUp,
            endangers: null,
          },
          {
            location: diagonalSquares(pieceLocation).rightUp,
            endangers: null,
          },
        ]
      : [
          {
            location: diagonalSquares(pieceLocation).leftDown,
            endangers: null,
          },
          {
            location: diagonalSquares(pieceLocation).rightDown,
            endangers: null,
          },
        ];
  return locations;
};

const calcDiaginal = (
  location: Location,
  right: boolean,
  up: boolean
): Location[] => {
  const digagonalLocationsArray: Location[] = [];
  for (
    let i = location;
    up ? i[0] !== 0 : i[0] !== 7 && right ? i[1] !== 7 : i[1] !== 0;
    i = [up ? i[0] - 1 : i[0] + 1, right ? i[1] + 1 : i[1] - 1]
  ) {
    if (!arrayEqual(i, location)) {
      digagonalLocationsArray.push(i);
    }
  }
  return digagonalLocationsArray;
};

const allDaigonalSqures = (location: Location): Location[] => {
  const locationsArray: Location[] = [];
  const optionsObject: {
    upRight: Location[];
    upLeft: Location[];
    downRight: Location[];
    downLeft: Location[];
  } = {
    upRight: calcDiaginal(location, true, true),
    upLeft: calcDiaginal(location, false, true),
    downRight: calcDiaginal(location, true, false),
    downLeft: calcDiaginal(location, false, false),
  };
  for (const direction in optionsObject) {
    locationsArray.push(
      ...optionsObject[
        direction as "upRight" | "upLeft" | "downRight" | "downLeft"
      ]
    );
  }
  return locationsArray;
};

const calcDangerIndicator = (
  pieceLocation: Location,
  threatenedPieceLocation: Location
): Location => {
  const direction: { up: boolean; right: boolean } = {
    up: pieceLocation[0] - threatenedPieceLocation[0] > 0,
    right: pieceLocation[1] - threatenedPieceLocation[1] < 0,
  };
  return [
    direction.up
      ? threatenedPieceLocation[0] - 1
      : threatenedPieceLocation[0] + 1,
    direction.right
      ? threatenedPieceLocation[1] + 1
      : threatenedPieceLocation[1] - 1,
  ];
};

const indicatorLocations = (
  pieceLocationProp: Location | null,
  postions: IBoardPositions,
  queenPositions: IBoardPositions,
  turn: "red" | "blue",
  first: boolean,
  isQueen: boolean
): IndicatorInfo[] => {
  if (pieceLocationProp === null) return [];

  const locations: IndicatorInfo[] = isQueen
    ? allDaigonalSqures(pieceLocationProp).map((location) => ({
        location,
        endangers: null,
      }))
    : imiddeateMoves(postions, pieceLocationProp);

  const threatLocations = threatendPieces(
    locations.map((info) => info.location),
    postions,
    turn
  ).concat(
    threatendPieces(
      locations.map((info) => info.location),
      queenPositions,
      turn
    )
  );

  if (threatLocations.length > 0) {
    threatLocations.forEach((pieceLocation) => {
      const newLocation: Location = calcDangerIndicator(
        pieceLocationProp,
        pieceLocation
      );

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
          arrayIncludes(info.location, postions["red"]) ||
          arrayIncludes(info.location, postions["blue"]) ||
          arrayIncludes(info.location, queenPositions["red"]) ||
          arrayIncludes(info.location, queenPositions["blue"])
        )
    )
    .filter((info) => (first ? true : info.endangers !== null));
};

export { indicatorLocations };
