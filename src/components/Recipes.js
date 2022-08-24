import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { drinksFindName, drinksFindCategory } from '../services/ApiDrinks';
import { foodFindName, foodsFindCategory } from '../services/ApiFood';

export default function Recipes({ typePage }) {
  const [recipesDefault, setRecipesDefault] = useState([]);
  const [category, setCategory] = useState([]);
  const maxRecipes = 12;
  const maxCategory = 5;

  const defaultResults = async () => {
    const dataRecipes = typePage === 'foods'
      ? await foodFindName('') : await drinksFindName('');
    const dataCategory = typePage === 'foods'
      ? await foodsFindCategory() : await drinksFindCategory();

    setRecipesDefault(dataRecipes);
    setCategory(dataCategory);
  };

  useEffect(() => {
    defaultResults();
  }, []);

  const handleFilter = (item) => {
    console.log(item);
  };

  const button = (item, i) => (
    <button
      key={ i }
      type="button"
      data-testid={ `${item.strCategory}-category-filter` }
      onClick={ () => handleFilter(item) }
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
      {
        recipesDefault.drinks && recipesDefault.drinks.slice(0, maxRecipes)
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
        recipesDefault.meals && recipesDefault.meals.slice(0, maxRecipes)
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
