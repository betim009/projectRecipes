import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../AppContext/AppContext';
import CarouselFoods from '../components/CarouselFoods';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../style/DetailsRecipes.css';
import '../style/image.css';

const copy = require('clipboard-copy');

export default function DetailsRecipesDrinks() {
  const { id: currentId, setId, data, setData, ingredientList, setIngedientList,
    measureList, setMeasureList, recipeBtn, setRecipeBtn, inProgressRecipes,
    setInProgressRecipes, setDoneRecipes } = useContext(AppContext);

  const [isLinkCopied, setIsLinkCopied] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  const history = useHistory();
  const { pathname } = window.location;

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
    const strings = pathname.split('/');
    setId(strings[2]);
    drinksIdAPI(strings[2]);

    const verifyFav = localStorage.getItem('favoriteRecipes');
    if (verifyFav !== null) {
      const array = JSON.parse(verifyFav);
      const checkFav = array.some((el) => el.id === strings[2]);
      setIsFavorite(checkFav);
    }
  }, []);

  useEffect(() => {
    const dnRecipes = localStorage.getItem('doneRecipes');
    if (dnRecipes === null) {
      return localStorage.setItem('doneRecipes', JSON.stringify([]));
    }
    const array = JSON.parse(dnRecipes);

    const isDone = array.some((it) => it.id === currentId);
    if (isDone) {
      setRecipeBtn(false);
    }

    return setDoneRecipes(array);
  }, []);

  useEffect(() => {
    const progRecipes = localStorage.getItem('inProgressRecipes');
    if (progRecipes === null) {
      return localStorage.setItem('inProgressRecipes', '{}');
    }
    const obj = JSON.parse(progRecipes);
    return setInProgressRecipes(obj);
  }, []);

  const handleAddFav = () => {
    const favRecipes = localStorage.getItem('favoriteRecipes');

    const newFav = [{
      id: data.idDrink,
      type: 'drink',
      nationality: '',
      category: data.strCategory,
      alcoholicOrNot: data.strAlcoholic,
      name: data.strDrink,
      image: data.strDrinkThumb,
    }];

    if (favRecipes === null) {
      return localStorage.setItem('favoriteRecipes', JSON.stringify(newFav));
    }

    const array = JSON.parse(favRecipes);
    const newFavList = [...array, ...newFav];

    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavList));
  };

  const handleRemoveFav = () => {
    const favRecipes = localStorage.getItem('favoriteRecipes');
    const array = JSON.parse(favRecipes);

    const newArray = array.filter((ele) => ele.id !== currentId);

    localStorage.setItem('favoriteRecipes', JSON.stringify(newArray));
  };

  const handleFavoriteBtn = () => {
    setIsFavorite(!isFavorite);

    if (isFavorite) {
      handleRemoveFav();
    }
    if (!isFavorite) {
      handleAddFav();
    }
  };

  return (
    <div>
      <div className="bg-cz text-dark m-auto row">
        <img
          className="img-carrosel"
          src={ data.strDrinkThumb }
          alt={ data.strDrink }
          data-testid="recipe-photo"
        />
        <div className="col">
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
        </div>

        <div className="col">
          <button
            className="btn"
            type="button"
            onClick={ () => handleFavoriteBtn() }
          >
            <img
              data-testid="favorite-btn"
              src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
              alt="A button that favorite the recipe"
            />
          </button>
          <button
            className="btn"
            type="button"
            onClick={ () => {
              copy(`http://localhost:3000${pathname}`);
              setIsLinkCopied(false);
            } }
          >
            <img
              data-testid="share-btn"
              src={ shareIcon }
              alt="A button that share the recipe"
            />
          </button>
          <p hidden={ isLinkCopied }>Link copied!</p>

        </div>
      </div>
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
          <div className="fixed-bottom bg-laranja text-center">
            <button
              className="btn text-white ng"
              type="button"
              data-testid="start-recipe-btn"
              onClick={ () => { history.push(`/drinks/${currentId}/in-progress`); } }
            >
              {
                (inProgressRecipes.cocktails === undefined)
                  ? 'Start Recipe'
                  : (
                    Object.keys(inProgressRecipes.cocktails)
                      .some((recipeID) => recipeID === currentId) && 'Continue Recipe')
              }
            </button>
          </div>
        )
      }
    </div>
  );
}
