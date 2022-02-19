import { render } from "react-dom";
import App from "./App";
import "./css/main.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import mainStore from "./redux/mainStore";

const Main = () => {
  return <App />;
};

render(
  <Router>
    <Provider store={mainStore}>
      <Main />
    </Provider>
  </Router>,
  document.getElementById("root")
);
