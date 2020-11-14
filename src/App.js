import React from 'react'
import './App.css';
import {Switch,Route, useLocation,BrowserRouter as Router, useHistory} from 'react-router-dom'
import SignInSide from './pages/Login';
import Home from './pages/Home';

import Home2 from './pages/Home2';
function App() {

  const location = useHistory()

  return (
    <Router>
      <Switch location={location} >
        <Route exact path={"/"}><SignInSide /></Route>
        <Route exact path={"/home"}><Home /></Route>
        <Route exact path={"/home2"}><Home2 /></Route>
      </Switch>
    </Router>
  );
}

export default App;
