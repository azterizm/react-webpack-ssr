import { FC } from "react";
import { Provider } from "react-redux";
import configureStore from "../state/store";
import '../styles/App.css';
import { Counter } from './Counter';
import { Profile } from "./Profile";
import { Todos } from "./Todos";
import { AppProps } from "./types/AppProps";

const App: FC<AppProps> = ({ state }) => {
  const store = configureStore(state)

  return (
    <Provider store={store}>
      <div className="container">
        <Counter />
        <Profile />
        <Todos />
      </div>
    </Provider>
  )
}

export default App

