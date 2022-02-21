// Basic
import { Component } from "react";

// Router
import {
  Router,
  Route,
  Switch
} from "react-router-dom";

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';

// Pages
import Main from "./pages/main";
import Demo from "./pages/demo";
import history from "./utils/history";
import Payment from "./pages/payment";
import Facucet from "./pages/faucet";
import Header from "./components/header";

class App extends Component {

  render() {
    return (
      <div>
      <Header />
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/demo" component={Demo} />
            <Route exact path="/payment" component={Payment} />
            <Route exact path="/faucet" component={Facucet} />
            <Route path="*" component={Main} />
          </Switch>
        </Router>
      </Provider>
      </div>
    );
  }
}

export default App;
