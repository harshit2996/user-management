import React from 'react';
import './App.css';
import Users from './components/users';
import Login from './components/login';
import AddUser from './components/addUser';
import EditUser from './components/editUser';
import {ProtectedRoute} from './components/ProtectedRoute';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
        <div>
          
          <Switch>
            <Route exact path="/" component={Login} />
            <ProtectedRoute >
              <Switch>
                <Route path="/add" component={AddUser} />
                <Route path="/edit/:id" component={EditUser} />
                <Route path="/users" component={Users} />
              </Switch>
            </ProtectedRoute>
          </Switch>
        </div>
      </Router>
    </div>
  );
}


export default App;
