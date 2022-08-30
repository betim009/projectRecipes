import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../AppContext/AppContext';
import FavoriteButton from './FavoriteButton';
import ShareButton from './ShareButton';

export default function RecipeInProgress() {
  const { ingredientList, setIngedientList,
    measureList, setMeasureList } = useContext(AppContext);
  const { pathname } = window.location;
  const { id } = useParams();
  const [infoFoods, setInfoFoods] = useState([]);
  const [infoDrinks, setInfoDrinks] = useState([]);
  const [progress, setProgress] = useState({});
  const verification = (parameterList) => {
    const ingArrayList = parameterList.map((item) => item[0]);
    const prevStatus = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (pathname.includes('drinks')) {
      const cocktailsList = prevStatus.cocktails[id];
      const list = ingArrayList.reduce((acc, item) => {
        const value = cocktailsList.some((e) => e === item);
        return { ...acc, [item]: value };
      }, {});
      setProgress(list);
    }
    if (pathname.includes('foods')) {
      const mealsList = prevStatus.meals[id];
      const list = ingArrayList.reduce((acc, item) => {
        const value = mealsList.some((e) => e === item);
        return { ...acc, [item]: value };
      }, {});
      setProgress(list);
    }
  };

  const filterKeys = (info) => {
    const ingredient = Object.entries(info).filter((e) => e[0].includes('strIngredient'));
    const ingListFilter = ingredient.map((e) => e.slice(1))
      .filter((it) => it[0] !== '' && it[0] !== null);
    setIngedientList(ingListFilter);
    verification(ingListFilter);

    const measure = Object.entries(info).filter((e) => e[0].includes('strMeasure'));
    const meListFilter = measure.map((e) => e.slice(1))
      .filter((it) => it[0] !== '' && it[0] !== null);
    setMeasureList(meListFilter);
  };

  const fetchFood = async () => {
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const response = await request.json();
    setInfoFoods(response.meals[0]);
    const info = response.meals[0];

    filterKeys(info);
  };

  const fetchDrinks = async () => {
    const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const response = await request.json();
    const info = response.drinks[0];
    setInfoDrinks(response.drinks[0]);

    filterKeys(info);
  };

  useEffect(() => {
    const prevStatus = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (prevStatus === null) {
      const status = {
        cocktails: {},
        meals: {},
      };
      return localStorage.setItem('inProgressRecipes', JSON.stringify(status));
    }
  }, []);

  useEffect(() => {
    if (pathname.includes('foods')) {
      fetchFood();
    } else {
      fetchDrinks();
    }
  }, []);

  const handleRemoveItem = (target) => {
    const prevStatus = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (pathname.includes('drinks')) {
      const listDrinks = prevStatus.cocktails[id].filter((item) => item !== target.id);
      const statusDrinks = {
        ...prevStatus,
        cocktails: {
          ...prevStatus.cocktails,
          [id]: listDrinks,
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(statusDrinks));
    }
    if (pathname.includes('foods')) {
      const listFoods = prevStatus.meals[id].filter((item) => item !== target.id);
      const statusFoods = {
        ...prevStatus,
        meals: {
          ...prevStatus.meals,
          [id]: listFoods,
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(statusFoods));
    }
  };

  const handleCheckbox = (target) => {
    const prevStatus = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (pathname.includes('drinks')) {
      const statusDrinks = {
        ...prevStatus,
        cocktails: {
          ...prevStatus.cocktails,
          [id]: prevStatus.cocktails[id] === undefined
            ? [target.id]
            : [...prevStatus.cocktails[id], target.id],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(statusDrinks));
    }
    if (pathname.includes('foods')) {
      const statusFoods = {
        ...prevStatus,
        meals: {
          ...prevStatus.meals,
          [id]: prevStatus.meals[id] === undefined
            ? [target.id]
            : [...prevStatus.meals[id], target.id],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(statusFoods));
    }
  };

  const handleChecked = ({ target }) => {
    setProgress({ ...progress, [target.id]: !progress[target.id] });
    if (target.checked) {
      handleCheckbox(target);
    }
    if (!target.checked) {
      handleRemoveItem(target);
    }
  };

  return (
    <div>
      {
        pathname.includes('drinks') && (
          <div>
            <h1 data-testid="recipe-title">{infoDrinks.strDrink}</h1>
            <img
              src={ infoDrinks.strDrinkThumb }
              alt="foto-Drink"
              data-testid="recipe-photo"
            />
            <p data-testid="recipe-category">{infoDrinks.strCategory}</p>
            <FavoriteButton />
            <ShareButton pathname={ pathname } />
            <div>
              <h3>
                Ingredientes
              </h3>
              <ol>
                {ingredientList.map((item, index) => (
                  <label
                    key={ item }
                    htmlFor="checkbox"
                    data-testid={ `${index}-ingredient-step` }
                  >
                    <input
                      id={ `${item}` }
                      name="checkbox"
                      type="checkbox"
                      checked={ progress[item] }
                      onChange={ handleChecked }
                    />
                    <li>
                      {`${item} - ${measureList[index]}`}
                    </li>
                  </label>
                ))}
              </ol>
            </div>
            <p data-testid="instructions">{infoDrinks.strInstructions}</p>
            <button
              type="button"
              data-testid="finish-recipe-btn"
            >
              Finalizar Receita
            </button>
          </div>
        )
      }
      {
        pathname.includes('foods') && (
          <div>
            <h1 data-testid="recipe-title">{infoFoods.strFood}</h1>
            <img
              src={ infoFoods.strFoodThumb }
              alt="foto-meals"
              data-testid="recipe-photo"
            />
            <p data-testid="recipe-category">{infoFoods.strCategory}</p>
            <FavoriteButton />
            <ShareButton pathname={ pathname } />
            <div>
              <h3>
                Ingredientes
              </h3>
              <ol>
                {ingredientList.map((item, index) => (
                  <label
                    key={ index }
                    htmlFor="checkbox"
                    data-testid={ `${index}-ingredient-step` }
                  >
                    <input
                      id={ `${item}` }
                      name="checkbox"
                      type="checkbox"
                      checked={ progress[item] }
                      onChange={ handleCheckbox }
                    />
                    <li>
                      {`${item} - ${measureList[index]}`}
                    </li>
                  </label>
                ))}
              </ol>
            </div>
            <p data-testid="instructions">{infoFoods.strInstructions}</p>
            <button
              type="button"
              data-testid="finish-recipe-btn"
            >
              Finalizar Receita
            </button>
          </div>
        )
      }
    </div>
  );
}
