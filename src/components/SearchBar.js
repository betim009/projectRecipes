import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { foodFindIngredient, foodFindName, foodFindLetter } from '../services/ApiFood';
import { drinksFindIngredient,
  drinksFindName, drinksFindLetter } from '../services/ApiDrinks';

export default function SearchBar({ title }) {
  const [typeSearchRadio, setTypeSearchRadio] = useState();
  const [searchValue, setSearchValue] = useState();

  const handleFoods = () => {
    if (typeSearchRadio === 'ingredient') {
      foodFindIngredient(searchValue);
    }
    if (typeSearchRadio === 'name') {
      foodFindName(searchValue);
    }
    if (typeSearchRadio === 'firstLetter') {
      if (searchValue.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
      foodFindLetter(searchValue);
    }
  };

  const handleDrinks = () => {
    if (typeSearchRadio === 'ingredient') {
      drinksFindIngredient(searchValue);
    }
    if (typeSearchRadio === 'name') {
      drinksFindName(searchValue);
    }
    if (typeSearchRadio === 'firstLetter') {
      if (searchValue.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
      drinksFindLetter(searchValue);
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
          name="ingredient"
          data-testid="ingredient-search-radio"
        />
      </label>
      <label htmlFor="nameIngredient">
        Name
        <input
          onChange={ () => setTypeSearchRadio('name') }
          type="radio"
          name="name"
          data-testid="name-search-radio"
        />
      </label>
      <label htmlFor="firstLetter">
        First letter
        <input
          onChange={ () => setTypeSearchRadio('firstLetter') }
          type="radio"
          name="firstLetter"
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
