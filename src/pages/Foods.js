import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import AppContext from '../AppContext/AppContext';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';

export default function Foods() {
  const { recipes } = useContext(AppContext);

  return (
    <div>
      <Header title="Foods" search />
      {
        recipes.length === 1 && <Redirect to={ `/foods/${recipes[0].idMeal}` } />
      }
      {
        recipes.length > 1 && <Recipes />
      }
      <Footer />
    </div>
  );
}
