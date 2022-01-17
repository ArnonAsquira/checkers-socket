import { render } from "react-dom";
import App from "./App";
import "./css/main.css";

const Main = () => {
  return <App />;
};

render(<Main />, document.getElementById("root"));
