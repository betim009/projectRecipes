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
      <div className="container text-center mg-b">
        <div className="row mt-3 justify-content-center">
          {
            recipes.length > 1 && recipes.slice(0, max).map((item, index) => (
              <div
                className="col-6 .col-sm-4"
                data-testid={ `${index}-recipe-card` }
                key={ `${index}-${item.strMeal}` }
              >
                <Link to={ `/foods/${item.idMeal}` }>
                  <img
                    className="img-size mb-2"
                    src={ item.strMealThumb }
                    alt={ item.strMeal }
                    data-testid={ `${index}-card-img` }
                  />
                  <h3
                    data-testid={ `${index}-card-name` }
                    className="text-dark"
                  >
                    {item.strMeal}
                  </h3>
                </Link>
              </div>
            ))
          }
        </div>
      </div>
      <Footer />
    </div>
  );
}
