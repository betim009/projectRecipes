import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../AppContext/AppContext';
import Header from '../components/Header';

export default function Foods() {
  const { recipes } = useContext(AppContext);
  const history = useHistory();
  return (
    <div>
      <Header title="Foods" search />
      {
        recipes.length === 1 && history.push(`/foods/${recipes[0].idMeal}`)
      }
      {
        recipes.length > 1 && recipes.map((item, i) => (
          <div key={ i }>{item.strMeal}</div>
        ))
      }
    </div>
  );
}
