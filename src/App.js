import { BrowserRouter, Route, Switch } from "react-router-dom";
import UserList from "./components/UserList/UserList";
import WeatherApp from "./components/WeatherApp/WeatherApp";
import UserDetails from "./components/UserDetails/UserDetails";
import "./styles/global.scss";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={UserList} />
        <Route path="/weather" component={WeatherApp} />
        <Route
          path="/user/:userId"
          render={(routerProps) => {
            return <UserDetails {...routerProps} />;
          }}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
