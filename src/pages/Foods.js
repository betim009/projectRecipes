import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AppContext from '../AppContext/AppContext';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import '../style/image.css';

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
      <div className="container">
        <div className="row text-center justify-content-center">
          {
            recipes.length > 1 && recipes.slice(0, max).map((item, index) => (
              <Link to={ `/foods/${item.idMeal}` } key={ `${index}-${item.strMeal}` }>
                <div className="col-sm-6" data-testid={ `${index}-recipe-card` }>
                  <img
                    className="img-size"
                    src={ item.strMealThumb }
                    alt={ item.strMeal }
                    data-testid={ `${index}-card-img` }
                  />
                  <h3 data-testid={ `${index}-card-name` }>{item.strMeal}</h3>
                </div>
              </Link>
            ))
          }
        </div>
      </div>
      <Footer />
    </div>
  );
}
