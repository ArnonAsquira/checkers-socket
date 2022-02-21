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
type ILogoutBody = IJoinGameBody;

interface INewGameResponse {
  playerOne: { userName: string; id?: string } | null;
  playerTwo: { userName: string } | null;
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
  ILogoutBody,
};
