import React, { useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import AppContext from '../AppContext/AppContext';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import '../style/image.css';

export default function Drinks() {
  const { recipes } = useContext(AppContext);
  const max = 12;

  return (
    <div>
      <Header title="Drinks" search />
      {
        recipes.length === 0 && <Recipes typePage="drinks" />
      }
      {
        recipes.length === 1 && <Redirect to={ `/drinks/${recipes[0].idDrink}` } />
      }
      <div className="container text-center mg-b">
        <div className="row mt-3 justify-content-center">
          {
            recipes.length > 1 && recipes.slice(0, max).map((item, index) => (
              <div
                className="col-6 .col-sm-4"
                data-testid={ `${index}-recipe-card` }
                key={ `${index}-${item.strDrink}` }
              >
                <Link
                  to={ `/drinks/${item.idDrink}` }
                >
                  <img
                    className="img-size mb-2"
                    src={ item.strDrinkThumb }
                    alt={ item.strDrink }
                    data-testid={ `${index}-card-img` }
                  />
                  <h3
                    data-testid={ `${index}-card-name` }
                    className="text-dark"
                  >
                    {item.strDrink}
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
