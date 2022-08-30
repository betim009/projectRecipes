import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import FavoriteButton from './FavoriteButton';
import ShareButton from './ShareButton';

export default function CardProgress({ dataRecipe }) {
  const { pathname } = window.location;
  const { totalDataRecipe, ingredientsList } = dataRecipe;

  useEffect(() => {

  }, []);

  return (
    <div>
      { pathname.includes('drinks') && (
        <div>
          <h1 data-testid="recipe-title">{totalDataRecipe.strDrink}</h1>
          <img
            data-testid="recipe-photo"
            src={ totalDataRecipe.strDrinkThumb }
            alt="foto-Drink"
          />
          <p data-testid="recipe-category">{totalDataRecipe.strCategory}</p>
          <FavoriteButton />
          <ShareButton pathname={ pathname } />
          <h3>Ingredientes</h3>
          <ol>
            {ingredientsList.map((item, index) => (
              <label
                key={ `${item.name}-${index}` }
                htmlFor="checkbox"
                data-testid={ `${index}-ingredient-step` }
              >
                <input
                  name={ item.name }
                  type="checkbox"
                />
                <li>
                  {`${item.name} - ${item.measure}`}
                </li>
              </label>
            ))}
          </ol>
        </div>
      )}
      {/* { pathname.includes('foods') && (
        <div>
          <h1 data-testid="recipe-title">{infoFoods.strFood}</h1>
          <img
            src={ infoFoods.strFoodThumb }
            alt="foto-Drink"
            data-testid="recipe-photo"
          />
          <p data-testid="recipe-category">{infoFoods.strCategory}</p>
          <FavoriteButton />
          <ShareButton pathname={ pathname } />
        </div>
      )} */}
    </div>
  );
}

CardProgress.propTypes = {
  dataRecipe: PropTypes.objectOf(PropTypes.any).isRequired,
};
