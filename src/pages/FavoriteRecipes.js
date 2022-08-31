import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import '../style/CardList.css';

const copy = require('clipboard-copy');

export default function FavoriteRecipes() {
  const [isLinkCopied, setIsLinkCopied] = useState(true);
  const [allFavorites, setAllFavorites] = useState([]);
  const [favoriteList, setFavoriteList] = useState([]);

  const history = useHistory();

  useEffect(() => {
    const verifyFav = localStorage.getItem('favoriteRecipes');
    if (verifyFav !== null) {
      const array = JSON.parse(verifyFav);
      setAllFavorites(array);
      setFavoriteList(array);
    }
  }, []);

  const handleRemoveFav = (recipeId) => {
    const newArray = favoriteList.filter((ele) => ele.id !== recipeId);

    localStorage.setItem('favoriteRecipes', JSON.stringify(newArray));
    setFavoriteList(newArray);
  };

  const allFilter = () => {
    setFavoriteList(allFavorites);
  };

  const favoriteFilter = (recipeType) => {
    const newList = allFavorites.filter((item) => item.type === recipeType);
    setFavoriteList(newList);
  };

  return (
    <div>
      <Header title="Favorite Recipes" search={ false } />
      <div className="text-center mb-3 mt-3">
        <button
          className="btn bg-amarelo ml-1 rounded"
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => allFilter() }
        >
          All
        </button>
        <button
          className="btn bg-amarelo ml-1 rounded"
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => favoriteFilter('food') }
        >
          Food
        </button>
        <button
          className="btn bg-amarelo ml-1 rounded"
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => favoriteFilter('drink') }
        >
          Drinks
        </button>
      </div>
      <div className="text-center container">
        {
          favoriteList.map((recipe, index) => (
            <div
              className="row shadow mb-5"
              key={ recipe.id }
            >
              <Link to={ `/${recipe.type}s/${recipe.id}` }>
                <img
                  className="card-image"
                  data-testid={ `${index}-horizontal-image` }
                  src={ recipe.image }
                  alt={ recipe.name }
                />
              </Link>
              <div className="col">
                {
                  (recipe.type === 'food')
                    ? (
                      <p
                        className="text-dark"
                        data-testid={ `${index}-horizontal-top-text` }
                      >
                        {recipe.nationality}
                        {' '}
                        -
                        {' '}
                        {recipe.category}
                      </p>
                    )
                    : (
                      <p
                        className="text-dark"
                        data-testid={ `${index}-horizontal-top-text` }
                      >
                        {recipe.alcoholicOrNot}
                      </p>
                    )
                }
                <button
                  className="btn"
                  type="button"
                  onClick={ () => history.push(`${recipe.type}s/${recipe.id}`) }
                >
                  <h1
                    className="h5 ngt"
                    data-testid={ `${index}-horizontal-name` }
                  >
                    {recipe.name}

                  </h1>
                </button>
                <div>
                  <button
                    className="btn"
                    type="button"
                    onClick={ () => {
                      copy(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
                      setIsLinkCopied(false);
                    } }
                  >
                    <img
                      data-testid={ `${index}-horizontal-share-btn` }
                      src={ shareIcon }
                      alt="A button that share the recipe"
                    />
                  </button>
                  <p hidden={ isLinkCopied }>Link copied!</p>
                  <button
                    className="btn"
                    type="button"
                    onClick={ () => handleRemoveFav(recipe.id) }
                  >
                    <img
                      data-testid={ `${index}-horizontal-favorite-btn` }
                      src={ blackHeartIcon }
                      alt="A button that favorite the recipe"
                    />
                  </button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}
