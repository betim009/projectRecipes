import React, { useContext, useEffect } from 'react';
import AppContext from '../AppContext/AppContext';

export default function DetailsRecipesDrinks() {
  const { id, setId, data, setData } = useContext(AppContext);

  const drinksIdAPI = async (drinkId) => {
    const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`);
    const response = await request.json();
    setData(...response.drinks);
  };

  useEffect(() => {
    const { pathname } = window.location;
    const strings = pathname.split('/');
    setId(strings[2]);
    drinksIdAPI(strings[2]);
  }, []);

  return (
    <div>
      <h1>
        DETAILS
        {' '}
        { id }
        { data.strMealThumb }
      </h1>
    </div>
  );
}
