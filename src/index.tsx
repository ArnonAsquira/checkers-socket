import { render } from "react-dom";
import App from "./App";
import "./css/main.css";
import { BrowserRouter as Router } from "react-router-dom";

const Main = () => {
  return <App />;
};

render(
  <Router>
    <Main />
  </Router>,
  document.getElementById("root")
);
