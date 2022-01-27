interface IndicatorInfo {
  location: Location;
  endangers: Location | null;
}

type Location = [number, number];

interface IDiagonalSquares {
  rightDown: Location;
  rightUp: Location;
  leftDown: Location;
  leftUp: Location;
}

type IDiagonalSquaresKey = "rightDown" | "rightUp" | "leftDown" | "leftUp";

interface IPieceInfoObject {
  location: Location;
  isQueen: boolean;
}

interface IBoardPositions {
  red: IPieceInfoObject[];
  blue: IPieceInfoObject[];
}

interface ITurn {
  color: "red" | "blue";
  from: IPieceInfoObject;
  to: IPieceInfoObject;
}

export type {
  Location,
  IndicatorInfo,
  IDiagonalSquares,
  IBoardPositions,
  IPieceInfoObject,
  IDiagonalSquaresKey,
  ITurn,
};
