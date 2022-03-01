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
interface IScoreData {
  id: {
    userName: string;
  };
  date: string;
}

interface IPlayersStats {
  checkersData: {
    wins: IScoreData[];
    loses: IScoreData[];
  };
}

interface IMessageObj {
  userName: string;
  content: string;
}

type BackgroundTypes = "dark" | "checkered" | "camo" | "light";
type LogoTypes = "smily" | "angry" | "cool" | "nerd" | null;

interface ICostumizationData {
  background: BackgroundTypes;
  logo: LogoTypes;
}

export type {
  IGameToken,
  IJoinGameBody,
  INewGameResponse,
  IActiveGamePlayers,
  IGameInfo,
  ILogoutBody,
  IPlayerTimers,
  IPlayersStats,
  IScoreData,
  IMessageObj,
  ICostumizationData,
  BackgroundTypes,
  LogoTypes,
};
