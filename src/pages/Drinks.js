import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import AppContext from '../AppContext/AppContext';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import { drinksFindName } from '../services/ApiDrinks';

export default function Drinks() {
  const { recipes } = useContext(AppContext);
  const [recipesDrinks, setRecipesDrinks] = useState([]);

  const defaultResults = async () => {
    const data = await drinksFindName('');
    setRecipesDrinks(data);
  };

  useEffect(() => {
    defaultResults();
  }, []);

  return (
    <div>
      <Header title="Drinks" search />
      {
        recipes.length === 1 && <Redirect to={ `/drinks/${recipes[0].idDrink}` } />
      }
      {
        recipes.length > 1 && <Recipes />
      }
      <Footer />
    </div>
  );
}
