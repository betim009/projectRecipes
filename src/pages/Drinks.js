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
      <div className="container">
        <div className="row">
          {
            recipes.length > 1 && recipes.slice(0, max).map((item, index) => (
              <Link to={ `/drinks/${item.idDrink}` } key={ `${index}-${item.strDrink}` }>
                <div
                  className="container text-center"
                  data-testid={ `${index}-recipe-card` }
                >
                  <img
                    className="img-size"
                    src={ item.strDrinkThumb }
                    alt={ item.strDrink }
                    data-testid={ `${index}-card-img` }
                  />
                  <h3 data-testid={ `${index}-card-name` }>{item.strDrink}</h3>
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
