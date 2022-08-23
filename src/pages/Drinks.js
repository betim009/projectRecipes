import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import AppContext from '../AppContext/AppContext';

export default function Drinks() {
  const { recipes } = useContext(AppContext);
  const history = useHistory();
  return (
    <div>
      <Header title="Drinks" search />
      {
        recipes.length === 1 && history.push(`/drinks/${recipes[0].idDrink}`)
      }
      {
        recipes.length > 1 && recipes.map((item, i) => (
          <div key={ i }>{item.strDrink}</div>
        ))
      }
    </div>
  );
}
