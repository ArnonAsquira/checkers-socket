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
  playerOne: { userName: string; id?: string; time: number } | null;
  playerTwo: { userName: string; time: number } | null;
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

interface IPlayerTimers {
  playerOne: number | null;
  playerTwo: number | null;
}

export type {
  IGameToken,
  IJoinGameBody,
  INewGameResponse,
  IActiveGamePlayers,
  IGameInfo,
  ILogoutBody,
  IPlayerTimers,
};
