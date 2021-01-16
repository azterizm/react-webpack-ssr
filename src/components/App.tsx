import configureStore from "../state/store";
import { FC, useState } from "react";
import { Provider } from "react-redux";
import '../styles/App.css'
import { Todos } from "./Todos";
import { Profile } from "./Profile";

interface AppProps {
  state: {
    name: string
  }
}

const App: FC<AppProps> = ({ state }) => {
  const [count, setCount] = useState<number>(0)

  const store = configureStore(state)

  return (
    <Provider store={store}>
      <div className="container">
        <div id="counter">
          <h1>{count}</h1>
          <button onClick={() => setCount(e => e + 1)}>Add</button>
        </div>
        <Profile />
        <Todos />
      </div>
    </Provider>
  )
}

declare global {
  interface Window {
    APP_STATE: {
      name: string
    }
  }
}

export default App

