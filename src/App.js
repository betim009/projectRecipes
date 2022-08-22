import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/foods" component={ Foods } />
      <Route path="/drinks" component={ Drinks } />
      <Route exact path="/foods/:id" />
      <Route exact path="/drinks/:id" />
      <Route exact path="/foods/:id/in-progress" />
      <Route exact path="/drinks/:id/in-progress" />
      <Route path="/profile" component={ Profile } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
    </Switch>
  );
}

export default App;
