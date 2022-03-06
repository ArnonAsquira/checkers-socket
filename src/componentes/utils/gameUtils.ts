import {
  IBoardPositions,
  IndicatorInfo,
  IPieceInfoObject,
  PlatyerColors,
  Location,
} from "../../types/boardTypes";
import { indicatorLocations, oppositeColor } from "./boardUtils";
import arrayEqual, { arrayIncludes } from "./arrayEqual";
import { ILocalGameObj } from "./gameObject";

const isValidPiece = (gameObj: ILocalGameObj): boolean => {
  let isValid = false;
  if (gameObj.mandatoryMoves.length < 0) return true;
  const pieceIndicators = indicatorLocations(
    gameObj.selectedPiece,
    gameObj.positions,
    gameObj.currentTurn,
    gameObj.turnCounter === 0
  );
  for (const indicator of pieceIndicators) {
    for (const move of gameObj.mandatoryMoves) {
      if (arrayEqual(move.location, indicator.location)) {
        isValid = true;
      }
    }
  }
  return isValid;
};

const reachedEndOfBoard = (location: Location, color: PlatyerColors) => {
  if (color === "red") {
    return location[1] === 7;
  }
  return location[1] === 0;
};

const filterLocations = (pieceArray: IPieceInfoObject[], location: Location) =>
  pieceArray.filter((pieceInfo) => !arrayEqual(pieceInfo.location, location));

const updatePositions = (
  positions: IBoardPositions,
  indicator: IndicatorInfo,
  selectedPiece: IPieceInfoObject,
  turn: PlatyerColors
): IBoardPositions => ({
  ...positions,
  [turn]: filterLocations(positions[turn], selectedPiece.location).concat({
    location: indicator.location,
    isQueen:
      selectedPiece.isQueen || reachedEndOfBoard(indicator.location, turn),
  }),
  [oppositeColor(turn)]: filterLocations(
    positions[oppositeColor(turn)],
    indicator.endangers || [-1, -1]
  ),
});

const switchTurn = (gameObj: ILocalGameObj) => {
  gameObj.mandatoryMoves = [];
  gameObj.currentTurn = oppositeColor(gameObj.currentTurn);
  gameObj.selectedPiece = null;
};

const takeTurn = (gameObj: ILocalGameObj, indicator: IndicatorInfo) => {
  if (gameObj.selectedPiece === null) return;
  if (!isValidPiece(gameObj)) {
    return;
  }
  const newPositions = updatePositions(
    gameObj.positions,
    indicator,
    gameObj.selectedPiece,
    gameObj.currentTurn
  );
  gameObj.positions = newPositions;
  gameObj.selectedPiece =
    gameObj.positions[gameObj.currentTurn].find(
      (piece) => piece.location === indicator.location
    ) || null;
  gameObj.indicators = [];
  const consecutiveDangerIndicators = indicatorLocations(
    gameObj.selectedPiece,
    gameObj.positions,
    gameObj.currentTurn,
    false
  );
  if (consecutiveDangerIndicators.length > 0) {
    gameObj.mandatoryMoves = consecutiveDangerIndicators;
  } else {
    switchTurn(gameObj);
  }
};

const determinePieceViaLocation = (
  location: Location,
  positions: IBoardPositions,
  indicatorLocations: IndicatorInfo[]
) => {
  return arrayIncludes(
    location,
    positions.red.map((info) => info.location)
  )
    ? "red"
    : arrayIncludes(
        location,
        positions.blue.map((info) => info.location)
      )
    ? "blue"
    : indicatorLocations
        .map((indicatorLocation) =>
          arrayEqual(indicatorLocation.location, location)
        )
        .includes(true)
    ? "indicator"
    : undefined;
};

export { takeTurn, isValidPiece, determinePieceViaLocation };
