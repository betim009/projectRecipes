import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../AppContext/AppContext';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../style/Footer.css';
import '../style/recipes.css';

function Footer() {
  const { setRecipes } = useContext(AppContext);
  const history = useHistory();

  return (
    <footer className="fixed-bottom" data-testid="footer">
      <div className="container-fluid bg-laranja text-center p-1">
        <button
          type="button"
          className="m-1"
          onClick={ () => { history.push('/drinks'); setRecipes([]); } }
        >
          <img
            data-testid="drinks-bottom-btn"
            src={ drinkIcon }
            alt="A button that sends you to the drink page"
          />
        </button>
        <button
          type="button"
          onClick={ () => { history.push('/foods'); setRecipes([]); } }
        >
          <img
            data-testid="food-bottom-btn"
            src={ mealIcon }
            alt="A button that sends you to the meal page"
          />
        </button>
      </div>
    </footer>
  );
}

export default Footer;
