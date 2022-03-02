import { INewGameResponse } from "../../types/socketTypes";
import mainStore from "../../redux/mainStore";
import { joinedGame } from "../../redux/slices/socketSlice";
import {
  setGamePositions,
  setUsersColor,
  setGamePlayers,
  setTimers,
  setTurn,
  setLogo,
} from "../../redux/slices/onlineCheckersSlice";
import { colorOne, colorTwo } from "../../constants/board";

const updateInitialGameData = (
  gameData: INewGameResponse,
  userId: string | null
) => {
  console.log({ gameData });
  mainStore.dispatch(joinedGame(true));
  mainStore.dispatch(setGamePositions(gameData.gameinfo.positions));
  mainStore.dispatch(
    setUsersColor(gameData.playerOne?.id === userId ? colorOne : colorTwo)
  );
  mainStore.dispatch(
    setGamePlayers({
      playerOne: gameData.playerOne && gameData.playerOne.userName,
      playerTwo: gameData.playerTwo && gameData.playerTwo.userName,
    })
  );
  mainStore.dispatch(
    setTimers({
      playerOne: gameData.playerOne && gameData.playerOne.time,
      playerTwo: gameData.playerTwo && gameData.playerTwo.time,
    })
  );
  mainStore.dispatch(setTurn(colorOne));
  if (gameData.playerTwo) {
    mainStore.dispatch(
      setLogo({
        player: 1,
        logo: gameData.playerOne && gameData.playerOne.logo,
      })
    );
    mainStore.dispatch(
      setLogo({
        player: 2,
        logo: gameData.playerTwo && gameData.playerTwo.logo,
      })
    );
  } else {
    mainStore.dispatch(
      setLogo({
        player: 1,
        logo: gameData.playerOne && gameData.playerOne.logo,
      })
    );
  }
};

const joinGame = async (): Promise<boolean> => {
  return false;
};

export { updateInitialGameData };
