import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import AppContext from '../AppContext/AppContext';

export default function Drinks() {
  const { recipes } = AppContext;
  const { history } = useHistory();
  return (
    <div>
      <Header title="Drinks" search />
      {
        recipes.length > 0 ? recipes.map((e, i) => (
          <div key={ i }>{e.name}</div>
        )) : history.push(`/drinks/${e.id}`)
      }
    </div>
  );
}
