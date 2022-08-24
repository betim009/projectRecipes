import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import AppContext from '../AppContext/AppContext';
import Header from '../components/Header';

export default function Foods() {
  const { recipes } = useContext(AppContext);
  const max = 12;

  return (
    <div>
      <Header title="Foods" search />
      {
        recipes.length === 1 && <Redirect to={ `/foods/${recipes[0].idMeal}` } />
      }
      {
        recipes.length > 1 && recipes.slice(0, max).map((item, i) => (
          <div key={ item.strMeal } data-testid={ `${i}-recipe-card` }>
            <img
              src={ item.strMealThumb }
              alt={ item.strMeal }
              data-testid={ `${i}-card-img` }
            />
            <h3 data-testid={ `${i}-card-name` }>{item.strMeal}</h3>
          </div>
        ))
      }
      <Footer />
    </div>
  );
}
