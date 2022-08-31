import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CardProgress from './CardProgress';

export default function RecipeInProgress() {
  const { pathname } = window.location;
  const { id } = useParams();
  const keyStorage = pathname.includes('drinks') ? 'cocktails' : 'meals';
  const [infoRecipe, setInfoRecipe] = useState({
    totalDataRecipe: {},
    ingredientsList: [],
  });

  const updateStorage = (data) => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(data));
  };

  const initialStorage = (ingredientsList) => {
    const recoverStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const storage = recoverStorage === null
      ? {
        cocktails: {},
        meals: {},
      } : recoverStorage;
    const data = ingredientsList.reduce((acc, item) => ({
      ...acc,
      [item.name]: { ...item },
    }), {});
    const newStorage = {
      ...storage,
      [keyStorage]: {
        ...storage[keyStorage],
        [id]: data,
      },
    };

    updateStorage(newStorage);
  };

  const dataRecipe = (totalDataRecipe) => {
    const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const keyStatus = storage !== null
      ? Object.keys(storage[keyStorage]).includes(id)
      : false;
    const ingredientsNameList = Object.entries(totalDataRecipe)
      .filter((item) => item[0].includes('strIngredient'))
      .filter((item) => item[1] !== null)
      .map((item) => item[1]);
    const ingredientsMeasuresList = Object.entries(totalDataRecipe)
      .filter((item) => item[0].includes('strMeasure'))
      .filter((item) => item[1] !== null)
      .map((item) => item[1]);

    const ingredientsList = ingredientsNameList
      .map((item, index) => ({
        name: item,
        measure: ingredientsMeasuresList[index],
        status: keyStatus
          ? storage[keyStorage][id][item].status
          : false,
      }));

    const data = {
      totalDataRecipe,
      ingredientsList,
    };

    if (!keyStatus) initialStorage(ingredientsList);
    setInfoRecipe(data);
  };

  const fetchDrinks = async () => {
    const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const response = await request.json();
    const dataDrinks = response.drinks[0];
    dataRecipe(dataDrinks);
  };

  const fetchFood = async () => {
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const response = await request.json();
    const dataFoods = response.meals[0];
    dataRecipe(dataFoods);
  };

  useEffect(() => {
    if (pathname.includes('drinks')) {
      fetchDrinks();
    } else {
      fetchFood();
    }
  }, []);

  const handleChangeCheckbox = ({ target }) => {
    const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const { name, checked } = target;
    const newStorage = {
      ...storage,
      [keyStorage]: {
        ...storage[keyStorage],
        [id]: {
          ...storage[keyStorage][id],
          [name]: {
            ...storage[keyStorage][id][name],
            status: checked,
          },
        },
      },
    };
    const ingredientsList = infoRecipe.ingredientsList
      .map((item) => (item.name === name ? {
        ...item,
        status: checked,
      } : item));

    setInfoRecipe({
      ...infoRecipe,
      ingredientsList,
    });
    updateStorage(newStorage);
  };

  console.clear();
  console.log('infoRecipe: ', infoRecipe);
  console.log('localStorage: ', JSON.parse(localStorage.getItem('inProgressRecipes')));

  return (
    <div>
      { infoRecipe.totalDataRecipe
        && <CardProgress
          dataRecipe={ infoRecipe }
          onChange={ handleChangeCheckbox }
        /> }
    </div>
  );
}
