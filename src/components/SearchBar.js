import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { foodFindIngredient, foodFindName, foodFindLetter } from '../services/ApiFood';
import { drinksFindIngredient,
  drinksFindName, drinksFindLetter } from '../services/ApiDrinks';
import AppContext from '../AppContext/AppContext';

export default function SearchBar({ title }) {
  const [typeSearchRadio, setTypeSearchRadio] = useState();
  const [searchValue, setSearchValue] = useState('');
  const { setRecipes, recipes } = useContext(AppContext);

  const handleFoods = async () => {
    if (typeSearchRadio === 'ingredient') {
      const data = await foodFindIngredient(searchValue);
      setRecipes(data.meals);
      console.log(recipes, data);
    }
    if (typeSearchRadio === 'name') {
      const data = await foodFindName(searchValue);
      setRecipes(data.meals);
    }
    if (typeSearchRadio === 'firstLetter') {
      if (searchValue.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
      const data = await foodFindLetter(searchValue);
      setRecipes(data.meals);
    }
  };

  const handleDrinks = async () => {
    if (typeSearchRadio === 'ingredient') {
      const data = await drinksFindIngredient(searchValue);
      setRecipes(data.drinks);
    }
    if (typeSearchRadio === 'name') {
      const data = await drinksFindName(searchValue);
      setRecipes(data.drinks);
    }
    if (typeSearchRadio === 'firstLetter') {
      if (searchValue.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
      const data = await drinksFindLetter(searchValue);
      setRecipes(data.drinks);
    }
  };

  const handleClick = () => {
    if (title === 'Foods') {
      handleFoods();
    } else {
      handleDrinks();
    }
  };

  const handleInputSearch = ({ target }) => {
    setSearchValue(target.value);
  };

  return (
    <div>
      <input type="text" data-testid="search-input" onChange={ handleInputSearch } />
      <label htmlFor="ingredient">
        ingredient
        <input
          onChange={ () => setTypeSearchRadio('ingredient') }
          type="radio"
          name="choice"
          data-testid="ingredient-search-radio"
        />
      </label>
      <label htmlFor="nameIngredient">
        Name
        <input
          onChange={ () => setTypeSearchRadio('name') }
          type="radio"
          name="choice"
          data-testid="name-search-radio"
        />
      </label>
      <label htmlFor="firstLetter">
        First letter
        <input
          onChange={ () => setTypeSearchRadio('firstLetter') }
          type="radio"
          name="choice"
          data-testid="first-letter-search-radio"
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Search
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  title: PropTypes.string.isRequired,
};
