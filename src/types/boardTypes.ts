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

interface IBoardPositions {
  red: Location[];
  blue: Location[];
}

export type { Location, IndicatorInfo, IDiagonalSquares, IBoardPositions };
