import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  drinksFilterByCategory, drinksFindCategory, drinksFindName
} from '../services/ApiDrinks';
import {
  foodFindName, foodsFilterByCategory, foodsFindCategory
} from '../services/ApiFood';

export default function Recipes({ typePage }) {
  const [recipes, setRecipes] = useState([]);
  const [category, setCategory] = useState([]);
  const [categoryToggle, setCategoryToggle] = useState({
    buttton1: false,
    buttton2: false,
    buttton3: false,
    buttton4: false,
    buttton5: false,
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
    const dataFilterRecipes = typePage === 'foods'
      ? await foodsFilterByCategory(item) : await drinksFilterByCategory(item);
    setRecipes(dataFilterRecipes);
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
            <div
              key={ `${index}-${item.strDrink}` }
              data-testid={ `${index}-recipe-card` }
            >
              <img
                src={ item.strDrinkThumb }
                alt={ item.strDrink }
                data-testid={ `${index}-card-img` }
              />
              <h3 data-testid={ `${index}-card-name` }>{item.strDrink}</h3>
            </div>
          ))
      }
      {
        recipes.meals && recipes.meals.slice(0, maxRecipes)
          .map((item, index) => (
            <div
              key={ `${index}-${item.strMeal}` }
              data-testid={ `${index}-recipe-card` }
            >
              <img
                src={ item.strMealThumb }
                alt={ item.strMeal }
                data-testid={ `${index}-card-img` }
              />
              <h3 data-testid={ `${index}-card-name` }>{item.strMeal}</h3>
            </div>
          ))
      }
    </div>
  );
}

Recipes.propTypes = {
  typePage: PropTypes.string.isRequired,
};
