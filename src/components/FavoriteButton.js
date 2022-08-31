import React, { useState } from 'react';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FavoriteButton() {
  const [isFavorite, setIsFavorite] = useState(false);

  // const handleRemoveFav = () => {
  //   const favRecipes = localStorage.getItem('favoriteRecipes');
  //   const array = JSON.parse(favRecipes);

  //   const newArray = array.filter((ele) => ele.id !== id);

  //   localStorage.setItem('favoriteRecipes', JSON.stringify(newArray));
  // };

  // const handleAddFav = () => {
  //   const favRecipes = localStorage.getItem('favoriteRecipes');

  //   const newFav = [{
  //     id: data.idMeal,
  //     type: 'food',
  //     nationality: data.strArea,
  //     category: data.strCategory,
  //     alcoholicOrNot: '',
  //     name: data.strMeal,
  //     image: data.strMealThumb,
  //   }];

  //   if (favRecipes === null) {
  //     return localStorage.setItem('favoriteRecipes', JSON.stringify(newFav));
  //   }

  //   const array = JSON.parse(favRecipes);
  //   const newFavList = [...array, ...newFav];

  //   localStorage.setItem('favoriteRecipes', JSON.stringify(newFavList));
  // };

  const handleFavoriteBtn = () => {
    setIsFavorite(!isFavorite);

    // if (isFavorite) {
    //   handleRemoveFav();
    // }
    // if (!isFavorite) {
    //   handleAddFav();
    // }
  };

  return (
    <div>
      <button
        className="btn"
        data-testid="favorite-btn"
        type="button"
        onClick={ () => handleFavoriteBtn() }
      >
        <img
          data-testid="favorite-btn"
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt="A button that favorite the recipe"
        />
      </button>
    </div>
  );
}
