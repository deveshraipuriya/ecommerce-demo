import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeComponent from './components/HomeComponent/HomeComponent';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AdminDashboard from './components/Admin/AdminDashboard';
import Login from './components/Login/Login'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
function App() {
  return (
    <Router>
      <Switch>
        <ProtectedRoute path="/home" component={HomeComponent} />
        <ProtectedRoute path="/admin" component={AdminDashboard} />
        <Route path="/login" component={Login} />
        <Route component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
