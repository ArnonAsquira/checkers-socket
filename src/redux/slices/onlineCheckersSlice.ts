import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IBoardPositions,
  IndicatorInfo,
  IPieceInfoObject,
  PlatyerColors,
} from "../../types/boardTypes";
import { IActiveGamePlayers } from "../../types/socketTypes";

interface IOnlineCheckersSlice {
  players: IActiveGamePlayers;
  currentTurn: PlatyerColors | null;
  usersColor: PlatyerColors | null;
  gamePositions: IBoardPositions | null;
  indicators: IndicatorInfo[];
  selectedPiece: IPieceInfoObject | null;
}

const initialState: IOnlineCheckersSlice = {
  currentTurn: null,
  usersColor: null,
  gamePositions: null,
  indicators: [],
  players: { playerOne: "", playerTwo: "" },
  selectedPiece: null,
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
} = onlineCheckersSlice.actions;

export default onlineCheckersSlice.reducer;
