import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";

const elems = (
  <BrowserRouter>
    <App state={window.APP_STATE} />
  </BrowserRouter>
)

hydrate(elems, document.getElementById('root'))
