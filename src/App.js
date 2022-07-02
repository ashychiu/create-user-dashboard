import { BrowserRouter, Route, Switch } from "react-router-dom";
import UserList from "./components/UserList/UserList";
import WeatherApp from "./components/WeatherApp/WeatherApp";
import UserDetails from "./components/UserDetails/UserDetails";
import TransLink from "./components/TransLink/TransLink";
import BlogPosts from "./components/BlogPosts/BlogPosts";

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
        <Route path="/translink" component={TransLink} />
        <Route path="/blog" component={BlogPosts} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
