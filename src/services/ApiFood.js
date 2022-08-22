import { useContext } from 'react';
import AppContext from '../AppContext/AppContext';

const { setRecipes } = useContext(AppContext);

export const foodFindIngredient = async (endPoint) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${endPoint}`);
  setRecipes(await response.json());
};

export const foodFindName = async (endPoint) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${endPoint}`);
  setRecipes(await response.json());
};

export const foodFindLetter = async (endPoint) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${endPoint}`);
  setRecipes(await response.json());
};
