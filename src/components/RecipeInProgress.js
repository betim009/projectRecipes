import { useEffect, useState } from 'react';

export default function RecipeInProgress() {
  const [infoRecipe, setInfoRecipe] = useState([]);

  useEffect(() => {
    setInfoRecipe(localStorage.getItem('favoriteRecipes'));
  }, []);
}
