import { useSelector } from "react-redux";
import { authAxiosConfig } from "../constants/axios";
import { MainStore } from "../redux/mainStore";
import fetchApi from "../generalUtils/axios";
import { INewGameResponse } from "../types/socketTypes";
import { socketApiBaseUrl } from "../utils/environmentVars";
import { updateInitialGameData } from "./services/game";
import { joinSocketGame } from "../socketLogic/initialConnection";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { onlineChckersPath } from "../constants/appPaths";
import { FC, useRef } from "react";

const CreateGameDiaolog: FC<{ open: boolean }> = ({ open }) => {
  const socketSlice = useSelector((state: MainStore) => state.socket);
  const userId = socketSlice.userId;

  const navigate = useNavigate();

  const timeInputRef = useRef<HTMLInputElement>(null);

  const handleOnlineGameCreation = async (time: number) => {
    if (!userId) {
      return;
    }
    try {
      const createGameRes = await fetchApi<INewGameResponse>(
        socketApiBaseUrl,
        "game/create",
        "post",
        authAxiosConfig(),
        { timer: time }
      );
      if (!createGameRes.success) {
        Swal.fire({ icon: "error", text: "could not create game" });
      }
      updateInitialGameData(createGameRes.data, socketSlice.userId);
      joinSocketGame(createGameRes.data.gameId, userId);
      navigate(onlineChckersPath);
    } catch (e) {
      return Swal.fire({ icon: "error", text: "could not connect to servers" });
    }
  };
  return (
    <dialog open={open} style={{ position: "fixed", zIndex: 100 }}>
      <label htmlFor="time">seconds per player</label>
      <input type="text" id="time" ref={timeInputRef} />
      <button
        onClick={() => {
          if (
            !timeInputRef.current ||
            !Number(timeInputRef.current.value) ||
            Number(timeInputRef.current.value) < 0
          ) {
            return Swal.fire({
              icon: "error",
              text: "please enter positive number of seconds",
            });
          }
          handleOnlineGameCreation(Number(timeInputRef.current.value));
        }}
      >
        create
      </button>
    </dialog>
  );
};

export default CreateGameDiaolog;
