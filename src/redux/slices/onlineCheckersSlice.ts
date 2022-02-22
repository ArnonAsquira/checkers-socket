import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IBoardPositions,
  IndicatorInfo,
  IPieceInfoObject,
  PlatyerColors,
} from "../../types/boardTypes";
import { IActiveGamePlayers, IPlayerTimers } from "../../types/socketTypes";

interface IOnlineCheckersSlice {
  players: IActiveGamePlayers;
  currentTurn: PlatyerColors | null;
  usersColor: PlatyerColors | null;
  gamePositions: IBoardPositions | null;
  indicators: IndicatorInfo[];
  selectedPiece: IPieceInfoObject | null;
  timers: IPlayerTimers;
}

const initialState: IOnlineCheckersSlice = {
  currentTurn: null,
  usersColor: null,
  gamePositions: null,
  indicators: [],
  players: { playerOne: "", playerTwo: "" },
  selectedPiece: null,
  timers: { playerOne: null, playerTwo: null },
};

const onlineCheckersSlice = createSlice({
  name: "onlineCheckers",
  initialState,
  reducers: {
    setTurn: (state, action: PayloadAction<PlatyerColors>) => ({
      ...state,
      currentTurn: action.payload,
    }),
    setUsersColor: (state, action: PayloadAction<PlatyerColors>) => ({
      ...state,
      usersColor: action.payload,
    }),
    setGamePositions: (state, action: PayloadAction<IBoardPositions>) => ({
      ...state,
      gamePositions: action.payload,
    }),
    setIndicators: (state, action: PayloadAction<IndicatorInfo[]>) => ({
      ...state,
      indicators: action.payload,
    }),
    setGamePlayers: (state, action: PayloadAction<IActiveGamePlayers>) => ({
      ...state,
      players: action.payload,
    }),
    addPlayer: (state, action: PayloadAction<string>) => ({
      ...state,
      players: { ...state.players, playerTwo: action.payload },
    }),
    removePlayer: (state, action: PayloadAction<number>) => ({
      ...state,
      players: {
        playerOne: action.payload === 1 ? null : state.players.playerOne,
        playerTwo: action.payload === 2 ? null : state.players.playerTwo,
      },
    }),
    setSelectedPiece: (
      state,
      action: PayloadAction<IPieceInfoObject | null>
    ) => ({
      ...state,
      selectedPiece: action.payload,
    }),
    setTimers: (state, action: PayloadAction<IPlayerTimers>) => ({
      ...state,
      timers: action.payload,
    }),
    passSecond: (state, action: PayloadAction<1 | 2>) => ({
      ...state,
      timers: {
        playerOne:
          action.payload === 1
            ? state.timers.playerOne && state.timers.playerOne - 1
            : state.timers.playerOne,
        playerTwo:
          action.payload === 2
            ? state.timers.playerTwo && state.timers.playerTwo - 1
            : state.timers.playerTwo,
      },
    }),
  },
});

export const {
  setTurn,
  setGamePositions,
  setUsersColor,
  setGamePlayers,
  addPlayer,
  setIndicators,
  setSelectedPiece,
  removePlayer,
  setTimers,
  passSecond,
} = onlineCheckersSlice.actions;

export default onlineCheckersSlice.reducer;
