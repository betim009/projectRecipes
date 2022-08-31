import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';
import ShareButton from './ShareButton';
import '../style/image.css';

export default function CardProgress({ dataRecipe, onChange }) {
  const history = useHistory();
  const { pathname } = window.location;
  const { totalDataRecipe, ingredientsList } = dataRecipe;

  // Esta linha é necessária devido um erro nos testes.
  const ingredientsListFilter = ingredientsList.filter((item) => item.name !== '');
  const disabledFinishButton = ingredientsListFilter
    .every((item) => item.status === true);

  const cardRecipe = (
    strName,
    strThumb,
    strCategory,
    strInstructions,
  ) => (
    <div>
      <div className="bg-cz text-center text-dark m-auto row">
        <img
          className="img-carrosel"
          data-testid="recipe-photo"
          src={ strThumb }
          alt="foto-Drink"
        />
        <div className="col">
          <h1
            className="text-dark negrito"
            data-testid="recipe-title"
          >
            {strName}

          </h1>
          <p className="h5" data-testid="recipe-category">{strCategory}</p>
        </div>
        <div className="col">
          <FavoriteButton />
          <ShareButton pathname={ pathname } />
        </div>
      </div>

      <h3>Ingredientes</h3>
      <ul className="list-group">
        {ingredientsListFilter
          .map((item, index) => (
            <div key={ `${item.name}-${index}` }>
              <label
                data-testid={ `${index}-ingredient-step` }
                htmlFor="checkbox"
              >
                <input
                  name={ item.name }
                  type="checkbox"
                  checked={ item.status }
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
        className="btn btn-dark"
        data-testid="finish-recipe-btn"
        type="button"
        disabled={ !disabledFinishButton }
        onClick={ () => history.push('/done-recipes') }
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
