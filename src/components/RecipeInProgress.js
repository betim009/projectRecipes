import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CardProgress from './CardProgress';

export default function RecipeInProgress() {
  const { pathname } = window.location;
  const { id } = useParams();
  const [infoRecipe, setInfoRecipe] = useState({});

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

  const storage = (ingredientsStorage) => {
    const prevStatusStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    console.log('Estado prévio storage: ', prevStatusStorage);
    if (prevStatusStorage === null) {
      const initialStatus = {
        cocktails: pathname.includes('drinks')
          ? {
            [id]: ingredientsStorage,
          }
          : {},
        meals: pathname.includes('foods')
          ? {
            [id]: ingredientsStorage,
          }
          : {},
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(initialStatus));
      console.log('Estado inicial storage: ', initialStatus);
    } else {
      const updateStatus = {
        cocktails: pathname.includes('drinks')
          ? {
            ...prevStatusStorage.cocktails,
            [id]: ingredientsStorage,
          }
          : { ...prevStatusStorage.cocktails },
        meals: pathname.includes('foods')
          ? {
            ...prevStatusStorage.meals,
            [id]: ingredientsStorage,
          }
          : { ...prevStatusStorage.meals },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(updateStatus));
      console.log('Estado atualizado storage: ', updateStatus);
    }
  };

  const dataRecipe = (totalDataRecipe) => {
    const ingredientsNameList = Object.entries(totalDataRecipe)
      .filter((item) => item[0].includes('strIngredient'))
      .filter((item) => item[1] !== null)
      .map((item) => item[1]);
    const ingredientsMeasuresList = Object.entries(totalDataRecipe)
      .filter((item) => item[0].includes('strMeasure'))
      .filter((item) => item[1] !== null)
      .map((item) => item[1]);
    const previousStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));

    // const previousCheckStorage = previousStorage === null
    //   ? ingredientsNameList.map(() => false)
    //   : pathname.includes('drinks')
    //     ? Object.keys(previousStorage.cocktails[id])
    //     : Object.keys(previousStorage.meals[id]);

    if (previousStorage !== null) {
      if (pathname.includes('drinks')) {
        const previousCheckStorageDrinks = previousStorage.cocktails[id]
          ? Object.keys(previousStorage.cocktails[id])
          : ingredientsNameList.map(() => false);
      } else {
        const previousCheckStorageFoods = previousStorage.meals[id]
          ? Object.keys(previousStorage.meals[id])
          : ingredientsNameList.map(() => false);
      }

      const previousCheck = pathname.includes('drinks')
        ? 
    } else {
      const initialCheckStorage = ingredientsNameList.map(() => false);
    }

    const ingredientsList = ingredientsNameList
      .map((item, index) => ({
        name: item,
        measure: ingredientsMeasuresList[index],
        status: [index],
      }));
    const ingredientsStorage = ingredientsNameList
      .reduce((acc, item, index) => ({
        ...acc,
        [item]: ingredientsList[index].status,
      }), {});

    storage(ingredientsStorage);

    const data = {
      totalDataRecipe,
      ingredientsList,
    };
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

  return (
    <div>
      { infoRecipe.totalDataRecipe && <CardProgress dataRecipe={ infoRecipe } /> }
    </div>
  );
}
