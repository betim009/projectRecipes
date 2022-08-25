export const foodFindIngredient = async (endPoint) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${endPoint}`);
  return response.json();
};

export const foodFindName = async (endPoint) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${endPoint}`);
  return response.json();
};

export const foodFindLetter = async (endPoint) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${endPoint}`);
  return response.json();
};

export const foodsFindCategory = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  return response.json();
};

export const foodsFilterByCategory = async (endPoint) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${endPoint}`);
  return response.json();
};
