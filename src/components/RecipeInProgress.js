import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../AppContext/AppContext';
import FavoriteButton from './FavoriteButton';
import ShareButton from './ShareButton';

export default function RecipeInProgress() {
  const { id, ingredientList, setIngedientList,
    measureList, setMeasureList } = useContext(AppContext);
  const { pathname } = window.location;
  const [infoFoods, setInfoFoods] = useState([]);
  const [infoDrinks, setInfoDrinks] = useState([]);

  const fetchFood = async () => {
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const response = await request.json();
    setInfoFoods(response.meals[0]);
    const info = response.meals[0];

    const ingredient = Object.entries(info).filter((e) => e[0].includes('strIngredient'));
    const ingListFilter = ingredient.map((e) => e.slice(1))
      .filter((it) => it[0] !== '' && it[0] !== null);
    setIngedientList(ingListFilter);

    const measure = Object.entries(info).filter((e) => e[0].includes('strMeasure'));
    const meListFilter = measure.map((e) => e.slice(1))
      .filter((it) => it[0] !== '' && it[0] !== null);
    setMeasureList(meListFilter);
  };

  const fetchDrinks = async () => {
    const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const response = await request.json();
    setInfoDrinks(response.drinks[0]);

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
    if (pathname.includes('foods')) {
      fetchFood();
    } else {
      fetchDrinks();
    }
  }, [id]);

  console.log(infoDrinks, infoFoods);
  return (
    <div>
      <h1 data-testid="recipe-title">{infoDrinks.strDrink}</h1>
      <img src={ infoDrinks.strDrinkThumb } alt="foto-Drink" data-testid="recipe-photo" />
      <p data-testid="recipe-category">{infoDrinks.strCategory}</p>
      <FavoriteButton />
      <ShareButton pathname={ pathname } />
      <div>
        <h3>
          Ingredientes
        </h3>
        <ol>
          {ingredientList.map((item, index) => (
            <label key={ item } htmlFor="checkbox">
              <input name="checkbox" type="checkbox" />
              <li data-testid={ `${index}-ingredient-step` }>
                {`${item} - ${measureList[index]}`}
              </li>
            </label>
          ))}
        </ol>
      </div>
      <p data-testid="instructions">{infoDrinks.strInstructions}</p>
      <button type="button" data-testid="finish-recipe-btn">Finalizar Receita</button>
    </div>
  );
}
