import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import '../style/CardList.css';

const copy = require('clipboard-copy');

export default function DoneRecipes() {
  const [isLinkCopied, setIsLinkCopied] = useState(true);
  const [allDone, setAllDone] = useState([]);
  const [doneList, setDoneList] = useState([]);

  const history = useHistory();

  useEffect(() => {
    const verifyDone = localStorage.getItem('doneRecipes');
    if (verifyDone !== null) {
      const array = JSON.parse(verifyDone);
      setAllDone(array);
      return setDoneList(array);
    }
    localStorage.setItem('doneRecipes', JSON.stringify([]));
  }, []);

  const allFilter = () => {
    setDoneList(allDone);
  };

  const doneFilter = (recipeType) => {
    const newList = allDone.filter((item) => item.type === recipeType);
    setDoneList(newList);
  };

  return (
    <div>
      <Header title="Done Recipes" search={ false } />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => allFilter() }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => doneFilter('food') }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => doneFilter('drink') }
        >
          Drinks
        </button>
      </div>
      <div>
        {
          doneList.map((recipe, indexArray) => (
            <div key={ recipe.id }>
              <Link to={ `/${recipe.type}s/${recipe.id}` }>
                <img
                  className="card-image"
                  data-testid={ `${indexArray}-horizontal-image` }
                  src={ recipe.image }
                  alt={ recipe.name }
                />
              </Link>
              {
                (recipe.type === 'food')
                  ? (
                    <div>
                      <p data-testid={ `${indexArray}-horizontal-top-text` }>
                        {recipe.nationality}
                        {' '}
                        -
                        {' '}
                        {recipe.category}
                      </p>
                      {recipe.tags.map((e, i) => (
                        <p key={ i } data-testid={ `${indexArray}-${e}-horizontal-tag` }>
                          {e}
                        </p>))}
                    </div>
                  )
                  : (
                    <p data-testid={ `${indexArray}-horizontal-top-text` }>
                      {recipe.alcoholicOrNot}
                    </p>
                  )
              }
              <button
                type="button"
                onClick={ () => history.push(`${recipe.type}s/${recipe.id}`) }
              >
                <h1 data-testid={ `${indexArray}-horizontal-name` }>{recipe.name}</h1>
              </button>
              <div>
                <button
                  type="button"
                  onClick={ () => {
                    copy(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
                    setIsLinkCopied(false);
                  } }
                >
                  <img
                    data-testid={ `${indexArray}-horizontal-share-btn` }
                    src={ shareIcon }
                    alt="A button that share the recipe"
                  />
                </button>
                <p hidden={ isLinkCopied }>Link copied!</p>
              </div>
              <p data-testid={ `${indexArray}-horizontal-done-date` }>
                {recipe.doneDate}
              </p>
            </div>
          ))
        }
      </div>
    </div>
  );
}
