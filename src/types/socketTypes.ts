import {
  IBoardPositions,
  IndicatorInfo,
  IPieceInfoObject,
  PlatyerColors,
} from "./boardTypes";

interface IGameToken {
  gameToken: string;
}

interface IJoinGameBody {
  userId: string;
  gameToken: string;
}

interface INewGameResponse {
  playerOne: string | null;
  playerTwo: string | null;
  gameId: string;
  gameinfo: IGameInfo;
}

interface IGameInfo {
  positions: IBoardPositions;
  turn: PlatyerColors;
  selcetedPiece: IPieceInfoObject | null;
  indicators: IndicatorInfo[];
}
interface IActiveGamePlayers {
  playerOne: string | null;
  playerTwo: string | null;
}

export type {
  IGameToken,
  IJoinGameBody,
  INewGameResponse,
  IActiveGamePlayers,
  IGameInfo,
};