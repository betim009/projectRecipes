import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../AppContext/AppContext';
import CarouselDrinks from '../components/CarouselDrinks';

export default function DetailsRecipesFoods() {
  const { setId, data, setData, ingredientList, setIngedientList,
    measureList, setMeasureList, recipeBtn } = useContext(AppContext);
  const [videoURL, setVideoURL] = useState('');

  const foodIdAPI = async (foodID) => {
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodID}`);
    const response = await request.json();
    setData(...response.meals);
    const info = response.meals[0];

    const url = info.strYoutube.split('=');
    setVideoURL(url[1]);

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
    foodIdAPI(strings[2]);
  }, []);

  useEffect(() => {
    const doneRecipes = localStorage.getItem('doneRecipes');
    if (doneRecipes === null) {
      return localStorage.setItem('doneRecipes', '[]');
    }
  }, []);

  return (
    <div>
      <img
        src={ data.strMealThumb }
        alt={ data.strMeal }
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{ data.strMeal }</h1>
      <h3 data-testid="recipe-category">
        Categoria:
        {''}
        { data.strCategory }
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
      <iframe
        data-testid="video"
        width="560"
        height="315"
        src={ `https://www.youtube.com/embed/${videoURL}` }
        title="YouTube video player"
        frameBorder="0"
        allowFullScreen
      />
      <div>
        <h3>
          Recomendações
        </h3>
        <CarouselDrinks />
      </div>
      {
        recipeBtn
        && <button type="button" data-testid="start-recipe-btn">Start Recipe</button>
      }
    </div>
  );
}
