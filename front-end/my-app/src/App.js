import './App.css';
import CustomersDetail from './CustomerDetail';
import EditCustomer from './EditCustomer';
import ActorsDetail from './actors/ActorDetail';
import EditActor from './actors/EditActor';
import { BrowserRouter as Router, Route,Switch} from "react-router-dom";
function App(props) {
  return (
 
     <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={CustomersDetail} />
          <Route path="/actors/" component={ActorsDetail} />
          <Route exact path="/EditCustomer/:id" component={EditCustomer} />
          <Route path="/EditActor/:id" component={EditActor} />
        </Switch>
      </div>
    </Router>
 
  );
}
 
export default App;