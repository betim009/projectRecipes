import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../style/recipes.css';
import '../style/Footer.css';

function Footer() {
  const history = useHistory();

  return (
    <footer className="fixed-bottom" data-testid="footer">
      <div className="container-fluid bg-laranja text-center p-1">
        <button
          type="button"
          className="m-1"
          onClick={ () => history.push('/drinks') }
        >
          <img
            data-testid="drinks-bottom-btn"
            src={ drinkIcon }
            alt="A button that sends you to the drink page"
          />
        </button>
        <button
          type="button"
          onClick={ () => history.push('/foods') }
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
