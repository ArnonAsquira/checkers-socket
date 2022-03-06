import { colorOne } from "../../constants/board";
import {
  IBoardPositions,
  IndicatorInfo,
  IPieceInfoObject,
  PlatyerColors,
} from "../../types/boardTypes";
import { initailPlayersLocations } from "./boardBuild";

interface ILocalGameObj {
  currentTurn: PlatyerColors;
  indicators: IndicatorInfo[];
  positions: IBoardPositions;
  mandatoryMoves: IndicatorInfo[];
  selectedPiece: IPieceInfoObject | null;
  turnCounter: number;
}

const initialGamePositions: IBoardPositions = {
  red: initailPlayersLocations.red.map((location) => ({
    location,
    isQueen: false,
  })),
  blue: initailPlayersLocations.blue.map((location) => ({
    location,
    isQueen: false,
  })),
};

const InitialGameObject: ILocalGameObj = {
  currentTurn: colorOne,
  indicators: [],
  positions: initialGamePositions,
  mandatoryMoves: [],
  selectedPiece: null,
  turnCounter: 0,
};

export type { ILocalGameObj };
export { InitialGameObject };
