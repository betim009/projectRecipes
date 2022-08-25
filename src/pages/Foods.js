import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AppContext from '../AppContext/AppContext';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';

export default function Foods() {
  const { recipes } = useContext(AppContext);
  const history = useHistory();
  const max = 12;

  return (
    <div>
      <Header title="Foods" search />
      {
        recipes.length === 0 && <Recipes typePage="foods" />
      }
      {
        recipes.length === 1 && history.push(`/foods/${recipes[0].idMeal}`)
      }
      {
        recipes.length > 1 && recipes.slice(0, max).map((item, index) => (
          <Link to={ `/foods/${item.idMeal}` } key={ `${index}-${item.strMeal}` }>
            <div data-testid={ `${index}-recipe-card` }>
              <img
                src={ item.strMealThumb }
                alt={ item.strMeal }
                data-testid={ `${index}-card-img` }
              />
              <h3 data-testid={ `${index}-card-name` }>{item.strMeal}</h3>
            </div>
          </Link>
        ))
      }
      <Footer />
    </div>
  );
}
