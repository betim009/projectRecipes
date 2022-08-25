import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  drinksFilterByCategory, drinksFindCategory, drinksFindName,
} from '../services/ApiDrinks';
import {
  foodFindName, foodsFilterByCategory, foodsFindCategory,
} from '../services/ApiFood';

export default function Recipes({ typePage }) {
  const [recipes, setRecipes] = useState([]);
  const [category, setCategory] = useState([]);
  const [categoryToggleFoods, setCategoryToggleFoods] = useState({
    Beef: true,
    Breakfast: true,
    Chicken: true,
    Dessert: true,
    Goat: true,
  });
  const [categoryToggleDrinks, setCategoryToggleDrinks] = useState({
    'Ordinary Drink': true,
    Cocktail: true,
    Shake: true,
    'Other/Unknown': true,
    Cocoa: true,
  });
  const maxRecipes = 12;
  const maxCategory = 5;

  const defaultResults = async () => {
    const dataRecipes = typePage === 'foods'
      ? await foodFindName('') : await drinksFindName('');
    const dataCategory = typePage === 'foods'
      ? await foodsFindCategory() : await drinksFindCategory();

    setRecipes(dataRecipes);
    setCategory(dataCategory);
  };

  useEffect(() => {
    defaultResults();
  }, []);

  const handleFilter = async (item) => {
    if (typePage === 'foods') {
      if (categoryToggleFoods[item] === true) {
        const filterRecipesFoods = await foodsFilterByCategory(item);
        setRecipes(filterRecipesFoods);
      } else {
        defaultResults();
      }
      setCategoryToggleFoods(
        { ...categoryToggleFoods, [item]: !categoryToggleFoods[item] },
      );
    } else {
      if (categoryToggleDrinks[item] === true) {
        const filterRecipesDrinks = await drinksFilterByCategory(item);
        setRecipes(filterRecipesDrinks);
      } else {
        defaultResults();
      }
      setCategoryToggleDrinks(
        { ...categoryToggleDrinks, [item]: !categoryToggleDrinks[item] },
      );
    }
  };

  const button = (item, i) => (
    <button
      key={ i }
      type="button"
      data-testid={ `${item.strCategory}-category-filter` }
      onClick={ () => handleFilter(item.strCategory) }
    >
      {item.strCategory}
    </button>
  );

  return (
    <div>
      {
        category.meals && category.meals.slice(0, maxCategory).map((item, i) => (
          button(item, i)
        ))
      }
      {
        category.drinks && category.drinks.slice(0, maxCategory).map((item, i) => (
          button(item, i)
        ))
      }
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => defaultResults() }
      >
        All
      </button>
      {
        recipes.drinks && recipes.drinks.slice(0, maxRecipes)
          .map((item, index) => (
            <Link to={ `/drinks/${item.idDrink}` } key={ `${index}-${item.strDrink}` }>
              <div data-testid={ `${index}-recipe-card` }>
                <img
                  src={ item.strDrinkThumb }
                  alt={ item.strDrink }
                  data-testid={ `${index}-card-img` }
                />
                <h3 data-testid={ `${index}-card-name` }>{item.strDrink}</h3>
              </div>
            </Link>
          ))
      }
      {
        recipes.meals && recipes.meals.slice(0, maxRecipes)
          .map((item, index) => (
            <Link to={ `/foods/${item.idMeal}` } key={ `${index}-${item.strMeal}` }>
              <div data-testid={ `${index}-recipe-card` }>
                <img
                  src={ item.strMealThumb }
                  alt={ item.strMeal }
                  data-testid={ `${index}-card-img` }
                />
                <h3 data-testid={ `${index}-card-name` }>{item.strMeal}</h3>
              </div>
            </Link>
          ))
      }
    </div>
  );
}

Recipes.propTypes = {
  typePage: PropTypes.string.isRequired,
};
