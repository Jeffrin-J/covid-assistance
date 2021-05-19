import PrimaryAppBar from './components/PrimaryAppBar.js'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DashBoard from './components/DashBoard.js';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={PrimaryAppBar} />
      <Route path="/dashboard/:username" component={DashBoard} />
    </Switch>
  </Router>
)
export default Routes;
