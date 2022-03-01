import React, { useState } from "react";
import TextInput from "./TextInput";
import useForm from "./utils/useForm";
import { loginUserIn } from "./utils/logUserIn";
import { signUserUp } from "./utils/signUserUp";
import { baseUrl } from "../constants";
import { LoginValues } from "../types/loginTypes";
import { SignUpValues } from "../types/signUpTypes";
import { useNavigate } from "react-router-dom";
import { playMenuPath } from "../constants/appPaths";
import { useStore } from "react-redux";
import { setUserId } from "../../redux/slices/socketSlice";
import axios from "axios";

export default function InputField() {
  const initalLoginState: LoginValues = {
    email: "",
    password: "",
  };
  const initialSignUpState: SignUpValues = {
    email: "",
    password: "",
    userName: "",
  };
  // state to determine weather to create a new user or login to existing one
  const [loginState, setLoginState] = useState<boolean>(false);
  const [LoginInputValues, LoginHandleInputChange] = useForm(initalLoginState);
  const [signUpInputValues, signHandleInputChange] =
    useForm(initialSignUpState);

  const mainStore = useStore();
  const navigate = useNavigate();

  function switchForms(newState: boolean) {
    setLoginState(newState);
  }
  async function submitForm() {
    return loginState
      ? await loginUserIn(baseUrl, LoginInputValues, navigate)
      : (await signUserUp(baseUrl, signUpInputValues))
      ? setLoginState(true)
      : setLoginState(false);
  }

  const handleGuestLoging = async () => {
    const { data }: { data: { token: string; id: string } } = await axios.post(
      `${baseUrl}/login/guest`
    );
    const token = data.token;
    const userId = data.id;
    document.cookie = token;
    mainStore.dispatch(setUserId(userId));
    navigate(playMenuPath);
  };

  return (
    <div className="input-field-container">
      <h1>Log In Or Sign Up</h1>
      <div className="login-buttons-div">
        <button className="login-button" onClick={(e) => switchForms(true)}>
          Log In
        </button>
        <button onClick={() => switchForms(false)}>Sign Up</button>
      </div>
      <div id="SignUp">
        <div hidden={loginState}>
          <TextInput
            id="new-userName-input"
            type="text"
            label="user name"
            name="userName"
            value={signUpInputValues.userName}
            handleInputChange={(e) => signHandleInputChange(e.target)}
          />
        </div>
        <TextInput
          id="new-email-input"
          type="email"
          label="email"
          name="email"
          value={loginState ? LoginInputValues.email : signUpInputValues.email}
          handleInputChange={(e) =>
            loginState
              ? LoginHandleInputChange(e.target)
              : signHandleInputChange(e.target)
          }
        />
        <TextInput
          id="new-password-input"
          type="password"
          label="password    "
          name="password"
          value={
            loginState ? LoginInputValues.password : signUpInputValues.password
          }
          handleInputChange={(e) =>
            loginState
              ? LoginHandleInputChange(e.target)
              : signHandleInputChange(e.target)
          }
        />
      </div>
      <div>
        <button
          className="submit-button"
          onClick={async () => {
            await submitForm();
          }}
        >
          Submit
        </button>
        <button className="guest-button" onClick={handleGuestLoging}>
          Login As Guest
        </button>
      </div>
    </div>
  );
}
