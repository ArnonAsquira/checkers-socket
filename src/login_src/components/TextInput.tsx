import React from "react";
import { ChangeEventHandler } from "react";

interface PropsForTextInput {
  id: string;
  label: string;
  type: string;
  name: string;
  value: string;
  handleInputChange: ChangeEventHandler<HTMLInputElement>;
}

export default function TextInput(props: PropsForTextInput) {
  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        style={{ minHeight: "25px" }}
        id={props.id}
        type={props.type}
        value={props.value}
        name={props.name}
        onChange={props.handleInputChange}
        required
      ></input>
    </form>
  );
}
