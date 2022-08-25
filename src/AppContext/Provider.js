import PropTypes from 'prop-types';
import React, { useState } from 'react';
import AppContext from './AppContext';

function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState(false);
  const [id, setId] = useState('');
  const [data, setData] = useState({});
  const [ingredientList, setIngedientList] = useState([]);
  const [measureList, setMeasureList] = useState([]);
  const [recipeBtn, setRecipeBtn] = useState(true);
  const [inProgressRecipes, setInProgressRecipes] = useState([]);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  const contextValue = {
    email,
    password,
    setEmail,
    setPassword,
    recipes,
    setRecipes,
    search,
    setSearch,
    id,
    setId,
    data,
    setData,
    ingredientList,
    setIngedientList,
    measureList,
    setMeasureList,
    recipeBtn,
    setRecipeBtn,
    inProgressRecipes,
    setInProgressRecipes,
    doneRecipes,
    setDoneRecipes,
    favoriteRecipes,
    setFavoriteRecipes,
  };

  return (
    <AppContext.Provider value={ contextValue }>
      {children}
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
