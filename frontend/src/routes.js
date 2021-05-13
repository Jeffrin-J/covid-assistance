import PrimaryAppBar from './components/PrimaryAppBar.js'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={PrimaryAppBar} />
    </Switch>
  </Router>
)
export default Routes;
