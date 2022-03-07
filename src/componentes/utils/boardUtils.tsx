import {
  Location,
  IDiagonalSquares,
  IndicatorInfo,
  IBoardPositions,
  IPieceInfoObject,
} from "../../types/boardTypes";
import arrayEqual, { arrayIncludes } from "./arrayEqual";
import BoardSqaure from "../BoardSquare";
import { determinePieceViaLocation } from "./gameUtils";
import { ILocalGameObj } from "./gameObject";

const oppositeColor = (color: "red" | "blue"): "red" | "blue" => {
  return color === "red" ? "blue" : "red";
};

const overLappingLocations = (
  indicatorLocationsProp: Location[],
  rivalLocations: IPieceInfoObject[]
): Location[] => {
  const threatenedPositionsInfo = rivalLocations.filter((postionsInfo) =>
    arrayIncludes(postionsInfo.location, indicatorLocationsProp)
  );
  return threatenedPositionsInfo.map((pieceInfo) => pieceInfo.location);
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
  pieceInfo: IPieceInfoObject,
  turn: "red" | "blue"
): Location[] => {
  let locationsObj = {
    leftUp:
      turn === "red" && !pieceInfo.isQueen
        ? null
        : diagonalSquares(pieceInfo.location).leftUp,
    leftDown:
      turn === "blue" && !pieceInfo.isQueen
        ? null
        : diagonalSquares(pieceInfo.location).leftDown,
    rightUp:
      turn === "red" && !pieceInfo.isQueen
        ? null
        : diagonalSquares(pieceInfo.location).rightUp,
    rightDown:
      turn === "blue" && !pieceInfo.isQueen
        ? null
        : diagonalSquares(pieceInfo.location).rightDown,
  };
  return Object.values(locationsObj).filter(
    (location) => location !== null
  ) as Location[];
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
  pieceInfo: IPieceInfoObject | null,
  postions: IBoardPositions,
  turn: "red" | "blue",
  first: boolean
): IndicatorInfo[] => {
  if (pieceInfo === null) return [];

  // diagonal squares of the selectedPiece
  const immideateLocations: Location[] = imiddeateMoves(pieceInfo, turn);

  const threatLocations = overLappingLocations(
    immideateLocations,
    postions[oppositeColor(turn)]
  );

  const indicatorLocations: IndicatorInfo[] = immideateLocations.map(
    (location) => ({ location, endangers: null })
  );

  if (threatLocations.length > 0) {
    threatLocations.forEach((pieceLocation) => {
      const newLocation: Location = calcDangerIndicator(
        pieceInfo.location,
        pieceLocation
      );
      if (
        newLocation[0] < 0 ||
        newLocation[0] > 7 ||
        newLocation[1] < 0 ||
        newLocation[1] > 7
      )
        return;
      const indicatorIndex = indicatorLocations.findIndex((info) =>
        arrayEqual(info.location, pieceLocation)
      );
      indicatorLocations[indicatorIndex] = {
        location: newLocation,
        endangers: pieceLocation,
      };
    });
  }

  const filteredIndicatoes: IndicatorInfo[] = indicatorLocations
    .filter(
      (info) =>
        !(
          arrayIncludes(
            info.location,
            postions["red"].map((info) => info.location)
          ) ||
          arrayIncludes(
            info.location,
            postions["blue"].map((info) => info.location)
          )
        )
    )
    .filter((info) => (first ? true : info.endangers !== null));

  const threatningIndicators = filteredIndicatoes.filter(
    (info) => info.endangers !== null
  );
  if (threatningIndicators.length > 0) {
    return threatningIndicators;
  }
  return filteredIndicatoes.filter(
    (info) =>
      !(
        info.location[0] < 0 ||
        info.location[0] > 7 ||
        info.location[1] < 0 ||
        info.location[1] > 7
      )
  );
};

const determineIsQueen = (location: Location, positions: IBoardPositions) => {
  return (
    arrayIncludes(
      location,
      positions.red.filter((info) => info.isQueen).map((info) => info.location)
    ) ||
    arrayIncludes(
      location,
      positions.blue.filter((info) => info.isQueen).map((info) => info.location)
    )
  );
};

const createCheckersBoard = (
  quardinatnts: Location[],
  amountOfRows: number,
  gameObj: ILocalGameObj,
  selectPiece: (piece: IPieceInfoObject) => void,
  takeTurn: (indicatorLocation: Location) => void
) => {
  const rows = [];
  for (let i = 0; i < quardinatnts.length; i += amountOfRows) {
    rows.push(
      <div style={{ minHeight: "50px" }}>
        {quardinatnts.slice(i, i + amountOfRows).map((location) => {
          return (
            <BoardSqaure
              location={location}
              color={(location[0] + location[1]) % 2 === 0 ? "light" : "dark"}
              player={determinePieceViaLocation(
                location,
                gameObj.positions,
                gameObj.indicators
              )}
              setSelectedPiece={selectPiece}
              isSelectedPiece={
                gameObj.selectedPiece === null
                  ? false
                  : arrayEqual(gameObj.selectedPiece.location, location)
              }
              takeTurn={takeTurn}
              isQueen={determineIsQueen(location, gameObj.positions)}
            />
          );
        })}
      </div>
    );
  }
  return rows;
};

export {
  indicatorLocations,
  oppositeColor,
  diagonalSquares,
  createCheckersBoard,
};