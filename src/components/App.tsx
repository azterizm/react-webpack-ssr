import { FC } from "react";
import { lazily } from "react-lazily";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import configureStore from "../state/store";
import '../styles/App.css';
import MetaTags from '../utils/MetaTags';
import { Counter } from "./Counter";
import { Header } from "./Header";
import { Login } from "./Login";
import { PrivacyPolicy } from "./PrivacyPolicy";
import { Profile } from "./Profile";
import { TermsAndConditions } from "./TermsAndConditions";
import { Todos } from "./Todos";

export interface AppProps {
  state: {
    name: string;
  };
}

const App: FC<AppProps> = ({ state }) => {
  const store = configureStore(state)

  return (
    <Provider store={store}>
      <div className="container">
          <MetaTags title='Home' description='Home to everything' img='test.png' />
          <Header />
          <Switch>
            <Route exact path='/' render={() => <h1>Time to change route!</h1>} />
            <Route path='/counter' component={Counter} />
            <Route path='/profile' component={Profile} />
            <Route path='/todos' component={Todos} />
            <Route path='/login' component={Login} />
            <Route path='/privacypolicy' component={PrivacyPolicy} />
            <Route path='/terms-conditions' component={TermsAndConditions} />
          </Switch>
      </div>
    </Provider>
  )
}

export default App

