import React, { useContext } from 'react';
import AppContext from '../AppContext/AppContext';

export default function DetailsRecipes() {
  const { recipeId } = useContext(AppContext);
  return (
    <div>
      {recipeId}
    </div>
  );
}
