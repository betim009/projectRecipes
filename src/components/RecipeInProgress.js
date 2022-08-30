import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CardProgress from './CardProgress';

export default function RecipeInProgress() {
  const { pathname } = window.location;
  const { id } = useParams();
  const [infoRecipe, setInfoRecipe] = useState({});

  const dataRecipe = (totalDataRecipe) => {
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
      }));

    const data = {
      totalDataRecipe,
      ingredientsList,
    };
    setInfoRecipe(data);
    console.log(data);
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

  return <CardProgress dataRecipe={ infoRecipe } />;
}
