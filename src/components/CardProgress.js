import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import FavoriteButton from './FavoriteButton';
import ShareButton from './ShareButton';

export default function CardProgress({ dataRecipe, onChange }) {
  const { pathname } = window.location;
  const { totalDataRecipe, ingredientsList } = dataRecipe;

  useEffect(() => {

  }, []);

  const cardRecipe = (
    strName,
    strThumb,
    strCategory,
    strInstructions,
  ) => (
    <div>
      <h1 data-testid="recipe-title">{strName}</h1>
      <img
        data-testid="recipe-photo"
        src={ strThumb }
        alt="foto-Drink"
      />
      <p data-testid="recipe-category">{strCategory}</p>
      <FavoriteButton />
      <ShareButton pathname={ pathname } />
      <h3>Ingredientes</h3>
      <ul>
        {ingredientsList
          .map((item, index) => (
            <div key={ `${item.name}-${index}` }>
              <label
                data-testid={ `${index}-ingredient-step` }
                htmlFor="checkbox"
              >
                <input
                  name={ item.name }
                  type="checkbox"
                  onChange={ onChange }
                />
                <li>
                  {`${item.name} - ${item.measure}`}
                </li>
              </label>
            </div>))}
      </ul>
      <p data-testid="instructions">{strInstructions}</p>
      <button
        data-testid="finish-recipe-btn"
        type="button"
      >
        Finalizar Receita
      </button>
    </div>
  );

  console.log('Informações da receita: ', dataRecipe);

  return (
    <div>
      { pathname.includes('drinks')
        && cardRecipe(
          totalDataRecipe.strDrink,
          totalDataRecipe.strDrinkThumb,
          totalDataRecipe.strCategory,
          totalDataRecipe.strInstructions,
        )}
      { pathname.includes('foods')
        && cardRecipe(
          totalDataRecipe.strFood,
          totalDataRecipe.strFoodThumb,
          totalDataRecipe.strCategory,
          totalDataRecipe.strInstructions,
        )}
    </div>
  );
}

CardProgress.propTypes = {
  dataRecipe: PropTypes.objectOf(PropTypes.any).isRequired,
  onChange: PropTypes.func.isRequired,
};
