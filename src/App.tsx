import { FC } from "react";
import { Route, Switch } from "react-router-dom";
import { HOME_URL } from "./routes";
import Home from "./screens/Home";

const App: FC = () => {
  return (
    <Switch>
      <Route path={HOME_URL}>
        <Home />
      </Route>
    </Switch>
  );
};

export default App;
