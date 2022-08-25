import React, { useContext, useEffect } from 'react';
import AppContext from '../AppContext/AppContext';
import CarouselFoods from '../components/CarouselFoods';

export default function DetailsRecipesDrinks() {
  const { id, setId, data, setData, ingredientList, setIngedientList,
    measureList, setMeasureList, recipeBtn, inProgressRecipes,
    setInProgressRecipes, favoriteRecipes, setFavoriteRecipe,
    doneRecipes, setDoneRecipes } = useContext(AppContext);

  const drinksIdAPI = async (drinkId) => {
    const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`);
    const response = await request.json();
    setData(...response.drinks);
    const info = response.drinks[0];

    const ingredient = Object.entries(info).filter((e) => e[0].includes('strIngredient'));
    const ingListFilter = ingredient.map((e) => e.slice(1))
      .filter((it) => it[0] !== '' && it[0] !== null);
    setIngedientList(ingListFilter);

    const measure = Object.entries(info).filter((e) => e[0].includes('strMeasure'));
    const meListFilter = measure.map((e) => e.slice(1))
      .filter((it) => it[0] !== '' && it[0] !== null);
    setMeasureList(meListFilter);
  };

  useEffect(() => {
    const { pathname } = window.location;
    const strings = pathname.split('/');
    setId(strings[2]);
    drinksIdAPI(strings[2]);
  }, []);

  useEffect(() => {
    const dnRecipes = localStorage.getItem('doneRecipes');
    if (dnRecipes === null) {
      return localStorage.setItem('doneRecipes', '[]');
    }
    return setDoneRecipes(dnRecipes);
  }, []);

  useEffect(() => {
    const progRecipes = localStorage.getItem('inProgressRecipes');
    if (progRecipes === null) {
      return localStorage.setItem('inProgressRecipes', '{}');
    }
    const obj = json.parse(progRecipes);
    return setInProgressRecipes([...obj]);
  }, []);

  useEffect(() => {
    const favRecipes = localStorage.getItem('favoriteRecipes');
    if (favRecipes === null) {
      return localStorage.setItem('favoriteRecipes', '[]');
    }
    return setFavoriteRecipe(favRecipes);
  }, []);

  return (
    <div>
      <img
        src={ data.strDrinkThumb }
        alt={ data.strDrink }
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{ data.strDrink }</h1>
      <h3 data-testid="recipe-category">
        Categoria:
        {''}
        { data.strCategory }
        {''}
        {'-'}
        {''}
        { data.strAlcoholic }
      </h3>
      <div>
        <h3>
          Ingredientes
        </h3>
        <ol>
          {ingredientList.map((item, index) => (
            <li key={ item } data-testid={ `${index}-ingredient-name-and-measure` }>
              {item}
              {' '}
              -
              {' '}
              {measureList[index]}
            </li>
          ))}
        </ol>
      </div>
      <p data-testid="instructions">{ data.strInstructions }</p>
      <div>
        <h3>
          Recomendações
        </h3>
        <CarouselFoods />
      </div>
      {
        recipeBtn
        && (
          <button type="button" data-testid="start-recipe-btn">
            {
              inProgressRecipes.some((e) => Object.keys(e.cocktails))
            }
          </button>
        )
      }
    </div>
  );
}
