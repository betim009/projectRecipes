import React, { useContext } from 'react';
import AppContext from '../AppContext/AppContext';

export default function Recipes() {
  const { recipes } = useContext(AppContext);
  const max = 12;
  console.log(recipes);

  return (
    <div>
      {
        recipes[0].idDrink && recipes.slice(0, max).map((item, index) => (
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
        recipes[0].idMeal && recipes.slice(0, max).map((item, index) => (
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
