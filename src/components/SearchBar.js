import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { foodFindIngredient, foodFindName, foodFindLetter } from '../services/ApiFood';
import { drinksFindIngredient,
  drinksFindName, drinksFindLetter } from '../services/ApiDrinks';
import AppContext from '../AppContext/AppContext';

export default function SearchBar({ title }) {
  const [typeSearchRadio, setTypeSearchRadio] = useState();
  const [searchValue, setSearchValue] = useState('');
  const { setRecipes } = useContext(AppContext);
  const message = 'Sorry, we haven\'t found any recipes for these filters.';

  const handleFoods = async () => {
    if (typeSearchRadio === 'ingredient') {
      const data = await foodFindIngredient(searchValue);
      if (data.meals === null) {
        global.alert(message);
        return;
      }
      setRecipes(data.meals);
    }
    if (typeSearchRadio === 'name') {
      const data = await foodFindName(searchValue);
      if (data.meals === null) {
        global.alert(message);
        return;
      }
      setRecipes(data.meals);
    }
    if (typeSearchRadio === 'firstLetter') {
      if (searchValue.length > 1) {
        global.alert('Your search must have only 1 (one) character');
        return;
      }
      const data = await foodFindLetter(searchValue);
      if (data.meals === null) {
        global.alert(message);
        return;
      }
      setRecipes(data.meals);
    }
  };

  const handleDrinks = async () => {
    if (typeSearchRadio === 'ingredient') {
      const data = await drinksFindIngredient(searchValue);
      if (data.drinks === null) {
        global.alert(message);
        return;
      }
      setRecipes(data.drinks);
    }
    if (typeSearchRadio === 'name') {
      const data = await drinksFindName(searchValue);
      if (data.drinks === null) {
        global.alert(message);
        return;
      }
      setRecipes(data.drinks);
    }
    if (typeSearchRadio === 'firstLetter') {
      if (searchValue.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
      const data = await drinksFindLetter(searchValue);
      if (data.drinks === null) {
        global.alert(message);
        return;
      }
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
    <div className="container-fluid justify-content-center">
      <div className="col">
        <div className="row">
          <input
            className="mr-1"
            type="text"
            data-testid="search-input"
            onChange={ handleInputSearch }
          />
        </div>
        <div className="row">
          <label className="mr-1" htmlFor="ingredient">
            ingredient
            <input
              className="ml-1"
              onChange={ () => setTypeSearchRadio('ingredient') }
              type="radio"
              name="choice"
              data-testid="ingredient-search-radio"
            />
          </label>
          <label className="mr-1" htmlFor="nameIngredient">
            Name
            <input
              className="ml-1"
              onChange={ () => setTypeSearchRadio('name') }
              type="radio"
              name="choice"
              data-testid="name-search-radio"
            />
          </label>
          <label htmlFor="firstLetter">
            First letter
            <input
              className="ml-1"
              onChange={ () => setTypeSearchRadio('firstLetter') }
              type="radio"
              name="choice"
              data-testid="first-letter-search-radio"
            />
          </label>
        </div>
        <div className="row text-center">
          <button
            className="btn btn-block btn-light"
            type="button"
            data-testid="exec-search-btn"
            onClick={ handleClick }
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  title: PropTypes.string.isRequired,
};
