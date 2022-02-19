import { deleteAllCookies } from "./deleteAllCookies";
import axios from "axios";
import Swal from "sweetalert2";
import { LoginValues } from "../../types/loginTypes";
import validateErr from "./extractErrorText";
import { NavigateFunction } from "react-router-dom";

export async function loginUserIn(
  baseUrl: string,
  inputValues: LoginValues,
  navigate: NavigateFunction
): Promise<string | false> {
  deleteAllCookies();
  try {
    const { data }: { data: string } = await axios.post(
      `${baseUrl}/login`,
      inputValues
    );
    document.cookie = data;
    navigate("/game");
    return data;
  } catch (err: any) {
    const loginError = validateErr(err);
    Swal.fire(loginError.text);
    return false;
  }
}
