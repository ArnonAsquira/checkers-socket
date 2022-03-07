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

const indicatorInMandatoryMoves = (
  mandatoryMoves: IndicatorInfo[],
  indicators: IndicatorInfo[]
): boolean => {
  if (mandatoryMoves.length < 1) {
    return true;
  }
  for (const indicator of indicators) {
    for (const move of mandatoryMoves) {
      if (arrayEqual(move.location, indicator.location)) {
        return true;
      }
    }
  }
  return false;
};

const isValidPiece = (gameObj: ILocalGameObj): boolean => {
  if (gameObj.mandatoryMoves.length < 0) return true;
  const pieceIndicators = indicatorLocations(
    gameObj.selectedPiece,
    gameObj.positions,
    gameObj.currentTurn,
    gameObj.turnCounter === 0
  );
  return indicatorInMandatoryMoves(gameObj.mandatoryMoves, pieceIndicators);
};

const pieceCanBeSlected = (gameObj: ILocalGameObj, piece: IPieceInfoObject) => {
  if (gameObj.turnCounter > 0) {
    return false;
  }
  const correctPieceTurn = gameObj.positions[gameObj.currentTurn].find(
    (turnsPiece) => arrayEqual(turnsPiece.location, piece.location)
  );
  if (!correctPieceTurn) {
    return false;
  }
  const pieceIndicators = indicatorLocations(
    piece,
    gameObj.positions,
    gameObj.currentTurn,
    true
  );
  return indicatorInMandatoryMoves(gameObj.mandatoryMoves, pieceIndicators);
};

const selectPiece = (
  piece: IPieceInfoObject,
  gameObj: ILocalGameObj
): ILocalGameObj => {
  if (!pieceCanBeSlected(gameObj, piece)) {
    alert("invalid piece");
    return gameObj;
  }
  gameObj.selectedPiece = piece;
  gameObj.indicators = indicatorLocations(
    piece,
    gameObj.positions,
    gameObj.currentTurn,
    true
  );
  return gameObj;
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
  if (gameObj.selectedPiece === null) return gameObj;
  if (!isValidPiece(gameObj)) {
    alert("invalid piece");
    return gameObj;
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
  ).filter((indicator) => indicator.endangers);
  if (consecutiveDangerIndicators.length > 0 && indicator.endangers) {
    gameObj.mandatoryMoves = consecutiveDangerIndicators;
  } else {
    switchTurn(gameObj);
  }
  return gameObj;
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

export { takeTurn, isValidPiece, determinePieceViaLocation, selectPiece };
