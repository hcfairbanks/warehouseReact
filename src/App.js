import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from './components/protectedRoute/protectedRoute'
import './App.css';
import About from './components/about/about'
import Items from './components/items/items'
import newItem from './components/newItem/newItem'
import editItem from './components/editItem/editItem'
import SignIn from './components/signIn/signIn'

function App() {
  return (
    <div className="App">
        <Switch>
          <Route exact path="/"       component={SignIn}/>
          <Route exact path="/signIn" component={SignIn}/>
          <ProtectedRoute exact path="/about" component={About}/>
          <ProtectedRoute exact path="/items/new" component={newItem}/>
          <ProtectedRoute exact path="/items/:id/edit" component={editItem}/>
          <ProtectedRoute exact path="/items" component={Items} />
        </Switch>
    </div>
  );
}
export default App;