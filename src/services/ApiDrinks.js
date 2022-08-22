import AppContext from '../AppContext/AppContext';

const { setRecipes } = AppContext;

export const drinksFindIngredient = async (endPoint) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${endPoint}`);
  setRecipes(await response.json());
};

export const drinksFindName = async (endPoint) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${endPoint}`);
  setRecipes(await response.json());
};

export const drinksFindLetter = async (endPoint) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${endPoint}`);
  setRecipes(await response.json());
};
