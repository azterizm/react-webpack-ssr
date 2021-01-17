import { FC } from "react";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import configureStore from "../state/store";
import '../styles/App.css';
import { Counter } from './Counter';
import { Header } from "./Header";
import { Profile } from "./Profile";
import { Todos } from "./Todos";
import { AppProps } from "./types/AppProps";

const App: FC<AppProps> = ({ state }) => {
  const store = configureStore(state)

  return (
    <Provider store={store}>
      <div className="container">
        <Header />
        <Switch>
          <Route exact path='/' render={() => <h1>Time to change route!</h1>} />
          <Route path='/counter' component={Counter} />
          <Route path='/profile' component={Profile} />
          <Route path='/todos' component={Todos} />
        </Switch>
      </div>
    </Provider>
  )
}

export default App

