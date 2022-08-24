import React, { useContext, useEffect } from 'react';
import AppContext from '../AppContext/AppContext';

export default function DetailsRecipesFoods() {
  const { id, setId, data, setData } = useContext(AppContext);

  const foodIdAPI = async (foodID) => {
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodID}`);
    const response = await request.json();
    setData(...response.meals);
  };

  useEffect(() => {
    const { pathname } = window.location;
    const strings = pathname.split('/');
    setId(strings[2]);
    foodIdAPI(strings[2]);
  }, []);

  return (
    <div>
      <img
        src={ data.strMealThumb }
        alt={ data.strMeal }
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{ data.strMeal }</h1>
      <h3 data-testid="recipe-category">{ data.strCategory }</h3>
      <p>Ingredientes</p>
      <p data-testid="instructions">{ data.strInstructions }</p>
    </div>
  );
}
