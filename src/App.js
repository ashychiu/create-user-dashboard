import { BrowserRouter, Route, Switch } from "react-router-dom";
import UserList from "./components/UserList/UserList";
import UserDetails from "./components/UserDetails/UserDetails";
import "./styles/global.scss";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={UserList} />
          <Route
            path="/user/:userId"
            render={(routerProps) => {
              return <UserDetails {...routerProps} />;
            }}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
