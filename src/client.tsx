import { hydrate } from "react-dom";
import App from "./components/App";

console.log('another test')

hydrate(
  <App state={window.APP_STATE} />,
  document.getElementById('root'))
