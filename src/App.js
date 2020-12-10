
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import Nav from "./components/nav.component";
import {Dashboard} from "./components/dashboard";
import {EditUserModal} from "./components/EditUserModal";

function App() {


  return (<Router>
        <div className="App">
          <meta name="csrf-token" content="{{ csrf_token() }}" />
          <link
              rel="stylesheet"
              href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
              integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
              crossOrigin="anonymous"
          />
          <meta name="csrf-token" content="{{ csrf_token() }}"/>
          <Nav />
          <Switch>

            <Route exact path='/' component={Login} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
          </Switch>
          <Route path='/dashbord' component={Dashboard} />
          <Route path='/edit' component={EditUserModal} />
        </div>
      </Router>
  );
}

export default App;
