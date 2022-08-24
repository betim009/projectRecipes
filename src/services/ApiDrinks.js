export const drinksFindIngredient = async (endPoint) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${endPoint}`);
  return response.json();
};

export const drinksFindName = async (endPoint) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${endPoint}`);
  return response.json();
};

export const drinksFindLetter = async (endPoint) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${endPoint}`);
  return response.json();
};

export const drinksFindCategory = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  return response.json();
};
