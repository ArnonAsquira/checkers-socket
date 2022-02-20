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
import { v4 as uuidv4 } from "uuid";
import { setUserId } from "../../redux/slices/socketSlice";

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

  const handleGuestLoging = () => {
    const userId = uuidv4();
    mainStore.dispatch(setUserId(userId));
    navigate(playMenuPath);
  };

  return (
    <div className="input-field-container">
      <h1>Login Or Sign Up</h1>
      <div>
        <button className="login-button" onClick={(e) => switchForms(true)}>
          Log-In
        </button>
        <button onClick={() => switchForms(false)}>Sign-Up</button>
      </div>
      <div id="SignUp">
        <div hidden={loginState}>
          <TextInput
            id="new-userName-input"
            type="text"
            label="enter userName"
            name="userName"
            value={signUpInputValues.userName}
            handleInputChange={(e) => signHandleInputChange(e.target)}
          />
        </div>
        <TextInput
          id="new-email-input"
          type="email"
          label="enter email"
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
          label="enter password"
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
      <button
        className="submit-button"
        onClick={async () => {
          await submitForm();
        }}
      >
        Submit
      </button>
      <button onClick={handleGuestLoging}>login as guest</button>
    </div>
  );
}