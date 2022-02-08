import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./styles/global.scss";

import UserList from "./components/UserList/UserList";
import UserDetails from "./components/UserDetails/UserDetails";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Header /> */}
        <Switch>
          <Route path="/" exact component={UserList} />
          <Route
            path="/user/:userId"
            exact
            render={(routerProps) => {
              return <UserDetails {...routerProps} />;
            }}
          />
        </Switch>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
