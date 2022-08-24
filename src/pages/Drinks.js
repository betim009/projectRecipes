import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import AppContext from '../AppContext/AppContext';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Drinks() {
  const { recipes } = useContext(AppContext);
  const max = 12;

  return (
    <div>
      <Header title="Drinks" search />
      {
        recipes.length === 1 && <Redirect to={ `/drinks/${recipes[0].idDrink}` } />
      }
      {
        recipes.length > 1 && recipes.slice(0, max).map((item, i) => (
          <div key={ item.strDrink } data-testid={ `${i}-recipe-card` }>
            <img
              src={ item.strDrinkThumb }
              alt={ item.strDrink }
              data-testid={ `${i}-card-img` }
            />
            <h3 data-testid={ `${i}-card-name` }>{item.strDrink}</h3>
          </div>
        ))
      }
      <Footer />
    </div>
  );
}
