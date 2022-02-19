import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBoardPositions, PlatyerColors } from "../../types/boardTypes";

interface IOnlineCheckersSlice {
  currentTurn: PlatyerColors | null;
  usersColor: PlatyerColors | null;
  gamePositions: IBoardPositions | null;
}

const initialState: IOnlineCheckersSlice = {
  currentTurn: null,
  usersColor: null,
  gamePositions: null,
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
  },
});

export const { setTurn } = onlineCheckersSlice.actions;

export default onlineCheckersSlice.reducer;
